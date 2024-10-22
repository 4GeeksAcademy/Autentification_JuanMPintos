import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });


    const [errorMessage, setErrorMessage] = useState("");  
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }

        const result = await actions.signupUsuario(formData);

        if (result.success) {
            setSuccessMessage("Usuario registrado con éxito");
            setErrorMessage("");
            Swal.fire({
                title: "Usuario registrado con éxito",
                text: "Serás redirigido al login.",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                sessionStorage.setItem("signup_email", formData.email);
                sessionStorage.setItem("signup_password", formData.password);

                navigate("/login");


                // Cerrar el modal de signup y abrir el de login
                const signupModal = document.getElementById("signupModal");
                const signupModalInstance = bootstrap.Modal.getInstance(signupModal);
                signupModalInstance.hide();

                const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
                loginModal.show();
            });

            setFormData({ email: "", password: "", repeatPassword: "" });
        } else if (result.message === "El email ya existe") {
            Swal.fire({
                title: "El email ya existe",
                text: "Serás redirigido a la página de inicio de sesión.",
                icon: "warning",
                confirmButtonText: "Aceptar",
            }).then(() => {
                sessionStorage.setItem("signup_email", formData.email);
                sessionStorage.setItem("signup_password", formData.password);

                const signupModal = document.getElementById("signupModal");
                const signupModalInstance = bootstrap.Modal.getInstance(signupModal);
                signupModalInstance.hide();

                const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
                loginModal.show();
            });
        } else {
            setErrorMessage(result.message || "Error al registrar el usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
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
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Escribe tu contraseña"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Repetir Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword2"
                    name="repeatPassword"
                    onChange={handleChange}
                    value={formData.repeatPassword}
                    placeholder="Repite tu contraseña"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
    );
};