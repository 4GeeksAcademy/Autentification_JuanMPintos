import { Signup } from "../component/signup";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Registro = () => {

	return (
		<>
		<h1>Registrate</h1>
			<Signup />
		</>
	);
};