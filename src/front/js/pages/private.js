import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export const Private = () => {
	const navigate = useNavigate();

	useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);


	const handleLogout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user_id');
		navigate('/');
	};

	return (
		<>
			<h1>Si se llega a leer esto es porq todo esta OK!</h1>
			<button
				type="submit"
				className="btn btn-primary"
				onClick={handleLogout}>
			Cerrar sesion
			</button>
		</>
	);
};
