import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<>
		<h1>Si se llega a leer esto es porq todo esta OK!</h1>
		<button
            type="submit"
            className="btn btn-primary">Cerrar sesion</button>
		</>
	);
};
