import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const API = "http://localhost:8081/api/login/user/login";
    const API2 = "http://localhost:8081/api/login/user/login/google";
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let datos = {
            contrasenia: password,
            correo: email,
        };
    
        const rawResponse = await fetch(API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
    
        const content = await rawResponse.json();
        const token = content.token;

        if(token){
            localStorage.setItem('token', token);
            console.log(token);
            router.push('/home');
        } else {
            console.log(content.message);
            alert('No has introducido un ususario o contraseña correctos');
        }
    };

    const handleGoogleLogin = async () => {
        // Haz una petición a API2 para obtener la URL
        const rawResponse = await fetch(API2, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await rawResponse.json();
        const googleLoginUrl = data.link;  // Asumiendo que la URL viene en el campo 'url' de la respuesta
    
        // Abre la ventana emergente de inicio de sesión de Google
        const googleLoginWindow = window.open(googleLoginUrl, '_blank', 'height=700,width=700');
    
        // Define una función de escucha para recibir mensajes de la ventana emergente
        window.addEventListener('message', (event) => {
            // Comprueba si el mensaje proviene de la ventana emergente
            if (event.source === googleLoginWindow) {
                // Comprueba si el mensaje es un token de acceso
                if (event.data.access_token) {
                    // Almacena el token en localStorage y redirige a la página de inicio
                    localStorage.setItem('token', event.data.access_token);
                    router.push('/home');
                } else {
                    console.log('Error en el inicio de sesión con Google:', event.data.error);
                }
            }
        });
    };
    
    return (
        <div className="flex flex-col justify-center items-center h-screen" style={{ backgroundColor: "var(--custom-background)" }}>
            <div className="p-8 m-4 w-full md:w-3/4 lg:w-1/2" style={{ backgroundColor: "var(--custom-div-background)" }}>
                <h1 className="mb-6 text-3xl text-center">Inicio de sesión</h1>
                <div className="login-container">
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="text-sm mb-1">Correo electrónico</label>
                            <input type="email" id="email" className="w-full px-3 py-2 border rounded text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm mb-1">Contraseña</label>
                            <input type="password" id="password" className="w-full px-3 py-2 border rounded text-black" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="w-full px-3 py-2 bg-blue-600 text-white rounded">Iniciar sesión</button>
                    </form>
                    <button onClick={handleGoogleLogin} className="w-full px-3 py-2 bg-red-600 text-white rounded mt-4">Iniciar sesión con Google</button>
                </div>
                <div className="flex justify-between mt-4">
                    <button type="button" onClick={() => router.push('/register')} className="text-blue-500">Registrarse</button>
                    <button type="button" onClick={() => router.push('/forgotpassword')} className="text-blue-500">Olvidé mi contraseña</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
