"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# ENDPOINT SIGNUP
@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.json
    user_query = User.query.filter_by(email=request_body["email"]).first()
    if user_query is None:
        create_user = User(email=request_body["email"], password=request_body["password"], is_active=True)
        db.session.add(create_user)
        db.session.commit()
        response_body = {
            "msg": "El usuario fue creado con exito"
        }
        return jsonify(response_body), 200
    else:
        response_body = {"msg": "El usuario ya existe"}
        return jsonify(response_body), 404
    
# ENDPOINT LOGIN
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    print(body)
    email = body.get('email')
    password = body.get('password')

    if not email or not password:
        return jsonify({'msg': 'Credenciales inválidas'}), 401

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'msg': 'El usuario no está registrado'}), 404
    if user.password != password:
        return jsonify({'msg': 'Password incorecto'})

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user_id': user.id
    }), 200

# USAMOS REFRESH TOKEN PARA GENERAR UNO NUEVO AUTOMATICAMENTE

@api.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify({
        'access_token': new_access_token
    }), 200



# RUTA PROTEGIDA CON TOKEN

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()  
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    return jsonify({
        'id': user.id,
        'email': user.email,
    }), 200


# VALIDAR EL TOKEN

@api.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()  
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    return jsonify({'msg': 'Token válido', 'user_id': user.id, 'email': user.email}), 200

# ENDPOINT PRIVATE
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    return jsonify({"id": user.id, "email": user.email }), 200


