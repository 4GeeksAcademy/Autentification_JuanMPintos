import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/index.css';
import { Context } from "../store/appContext"; 

export const Login = () => {
    const { actions } = useContext(Context);  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loginModalElement = document.getElementById('loginModal');

        if (loginModalElement) {  
            const onModalOpen = () => {
                const savedEmail = sessionStorage.getItem('signup_email');
                const savedPassword = sessionStorage.getItem('signup_password');

                setEmail(savedEmail || '');
                setPassword(savedPassword || '');

                sessionStorage.removeItem('signup_email');
                sessionStorage.removeItem('signup_password');
            };

            loginModalElement.addEventListener('shown.bs.modal', onModalOpen);

            return () => {
                loginModalElement.removeEventListener('shown.bs.modal', onModalOpen);
            };
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await actions.loginUsuario(email, password);

        if (result.success) {
            navigate('/private');  


        } else if (result.error === 'Usuario no registrado') {
            Swal.fire({
                title: 'Usuario no registrado',
                text: '¿Deseas registrarte?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((res) => {
                if (res.isConfirmed) {
                    sessionStorage.setItem('signup_email', email);
                    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                    if (loginModal) loginModal.hide();
                    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
                    signupModal.show();
                } else {
                    setEmail('');
                    setPassword('');
                }
            });

        } else if (result.error === 'Contraseña incorrecta') {
            Swal.fire({
                title: 'Contraseña incorrecta',
                text: 'Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                setPassword('');
            });
        } else {
            Swal.fire({
                title: 'Error al iniciar sesión',
                text: result.error || 'Error desconocido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="ejemplo@correo.com"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Escribe tu contraseña"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>
    );
};