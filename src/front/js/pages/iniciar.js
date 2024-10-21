import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Login } from "../component/login";
import { Context } from "../store/appContext";

export const Iniciar = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Login />
		</>
	);
};
