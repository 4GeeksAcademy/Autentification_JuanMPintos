import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	

	return (
		<>
			<h1>Bienvenido al la pagina principal del trabajo que debo de 4geeks</h1>
			<h2>Podemos registrarnos o iniciar sesion...si ya estas registrado hay q iniciar sesion, sino registrate</h2>
			<Link to="/signup">
			<button type="button" className="btn btn-warning" style={{ marginRight: "1cm" }}>Resgistrate</button>
			</Link>
			<Link to="/login">
			<button type="button" className="btn btn-danger">Iniciar sesion</button>
			</Link>
		</>
	);
};
