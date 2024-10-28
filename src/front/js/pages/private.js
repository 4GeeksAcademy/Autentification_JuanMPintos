import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Private = () => {
	const navigate = useNavigate();
    const { store, actions } = useContext(Context);
	
	useEffect(() => {
		const validateAccess = async () => {
			const isValid = await actions.getPrivate();
			if (!isValid){
				alert('No estas logueado');
				navigate('/');
			} 
		};
		validateAccess();
	}, []);


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




