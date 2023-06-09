import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl mb-4">Bienvenido a Game Shop</h1>
            <Link href="/login">
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700">
                    Inicio de sesion
                </button>
            </Link>
            <Link href="/register">
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                    Registrarse
                </button>
            </Link>
        </div>
    );
};

export default HomePage;