import React, { useState, useEffect, useContext } from "react";
import { Login } from "../component/login";
import { Context } from "../store/appContext";

export const Iniciar = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<h1>Iniciar sesion</h1>
			<Login />
		</>
	);
};
