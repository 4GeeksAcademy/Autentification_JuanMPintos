import React from "react";

export const Login = () => (
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">Correo Electronico</label>
            <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                //onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
            />
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Contraseña</label>
            <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                //onChange={handleChange}
                placeholder="Escribe tu contraseña"
                required
            />
        </div>
        <button
            type="submit"
            className="btn btn-primary">Iniciar ssesion</button>
    </form>
);