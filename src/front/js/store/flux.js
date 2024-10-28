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
                            email: formData.email,
                            password: formData.password,
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
            
                    if (response.ok) {
                        if (data.access_token && data.user_id) { 
                            sessionStorage.setItem('token', data.access_token);
                            sessionStorage.setItem('user_id', data.user_id); 
                            localStorage.setItem('user', data.user_id); 
                            
                            return { success: true, data: data };
                        } else {
                            return { success: false, error: 'Datos incompletos en la respuesta del servidor' };
                        }
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

            getPrivate: async () => {
                const token = sessionStorage.getItem("token");
            
                try {
                    const response = await fetch("https://crispy-enigma-x5rg4pqqqwxj2pgw6-3001.app.github.dev/api/private", {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    });
            
                    if (!response.ok) {
                        console.error("Error al obtener datos privados:", response.statusText);
                        return false;
                    }
            
                    const data = await response.json();
                    console.log(data);
                    return data;
                } catch (error) {
                    console.error("Error de conexión:", error);
                    return false;
                }
            }
		}
	};
};

export default getState;
