import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<>
		<h1>Si se llega a leer esto es porq todo esta OK!</h1>
		</>
	);
};
