const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
		},
		actions: {
			
			
			// REGISTRO USUARIO
			
			signupUsuario: async (formData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            password: formData.password,
                            telefono: formData.phone,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return { success: true, data: data };
                    } else if (response.status === 409) {
                        return { success: false, message: "El email ya existe" };
                    } else {
                        const errorData = await response.json();
                        return { success: false, message: errorData.msg || "Error al registrar el usuario" };
                    }
                } catch (error) {
                    return { success: false, message: "Error de conexión" };
                }
            },

			// LOGIN USUARIO
            loginUsuario: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        })
                    });

                    const data = await response.json();
                    console.log(data.user_id)

                    if (response.ok) {
                        sessionStorage.setItem('token', data.access_token);
                        sessionStorage.setItem('user_name', data.user_name);
                        sessionStorage.setItem('user_id', '1')
                        localStorage.setItem('usuario', data.user_id)
                        return { success: true, data: data };
                    } else if (response.status === 404) {
                        return { success: false, error: 'Usuario no registrado' };
                    } else if (response.status === 401) {
                        return { success: false, error: 'Contraseña incorrecta' };
                    } else {
                        return { success: false, error: data.msg || 'Error al iniciar sesión' };
                    }
                } catch (error) {
                    return { success: false, error: 'Error de conexión' };
                }
            },
		}
	};
};

export default getState;
