import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const API = "http://localhost:8081/api/login/user/register";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const datos = {
                nombre: fullName,
                correo: email,
                contrasenia: password,
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
            alert(content.message);
        } else {
            alert('No coinciden las contraseñas');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen" style={{ backgroundColor: "var(--custom-background)" }}>
            <div className="p-8 m-4 w-full md:w-3/4 lg:w-1/2" style={{ backgroundColor: "var(--custom-div-background)" }}>
                <h1 className="mb-6 text-3xl text-center">Registrarse</h1>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullName" className="text-sm mb-1">Nombre completo</label>
                        <input type="text" id="fullName" className="w-full px-3 py-2 border rounded text-black" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm mb-1">Correo electrónico</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border rounded text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm mb-1">Contraseña</label>
                        <input type="password" id="password" className="w-full px-3 py-2 border rounded text-black" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm mb-1">Confirmar contraseña</label>
                        <input type="password" id="confirmPassword" className="w-full px-3 py-2 border rounded text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="w-full px-3 py-2 bg-blue-600 text-white rounded">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
