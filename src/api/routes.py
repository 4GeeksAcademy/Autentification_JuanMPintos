"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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
def login_user():
    request_body = request.json
    user_query = User.query.filter_by(email=request_body["email"]).first()
    if user_query is None:
        response_body = {
            "msg": "Usuario no existe"
        }
        return jsonify(response_body), 404
    elif request_body["email"] != user_query.email or request_body["password"] != user_query.password:
        response_body = {
            "msg": "Usuario o contraseña incorrectos"
        }
        return jsonify(response_body), 404
    else:
        access_token = create_access_token(identity=user_query.id)
        return jsonify({ "token": access_token, "user_id": user_query.id })

# ENDPOINT PRIVATE
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    print(current_user_id)
    user = User.query.filter_by(id=current_user_id).first()
    print(user)
    return jsonify({"id": user.id, "email": user.email }), 200


