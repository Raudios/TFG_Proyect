import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Favorites = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [username, setUsername] = useState('');

    const API = "http://localhost:8081/api/data/favorite"; 
    const API2 = "http://localhost:8081/api/data/favorite/favorite_games"; 
    const API3 = "http://localhost:8081/api/data/user_data"; 

    useEffect(() => {
        /* Peticion para obtener los datos de los juegos favoritos del usuario */
        const fetchGames = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(API2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            const games = await response.json();
            setGames(games);
        };
        /* Peticion para obtener los juegos favoritos del usuario */
        const fetchWishlist = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.ok) {
                const wishlistGames = await response.json();
                setWishlist(wishlistGames);
            }
        };
        /* Peticion para obtener los datos del usuario */
        const fetchUsername = async () => {
            const response = await fetch(API3, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') // Asegúrate de que la solicitud está autenticada
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUsername(data.message);
            }
        };        
        
        fetchUsername();
        fetchWishlist().then(fetchGames);
    }, []);    

    /* Redireccionamiento a /home */
    const handleGoToHome = () => {
        router.push('/home');
    };
    /* Funcion para eliminar los juegos de la lista de favoritos */
    const handleRemoveFromWishlist = async (gameId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8081/api/data/favorite/remove/${gameId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    
        if (response.ok) {
            setWishlist(wishlist.filter(id => id !== gameId));
            setGames(games.filter(game => game.appId !== gameId));
        } else {
            // Handle error here
        }
    };
    /* Funcion para buscar juegos en concreto */
    const handleSearch = (e) => {
        e.preventDefault();

      // Esta es solo una búsqueda básica por título de juego en el frontend.
      // Si la búsqueda debe ser más compleja o se realiza en el backend, 
      // necesitarás ajustar esta lógica.
        const searchedGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setGames(searchedGames);
    };
    // Funcion para desplegar el menu al hacer click en el icono del usuario
    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    // Funcion para des logearte de la pagina removiendo el token que verifica al usuario
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
    <div className="bg-gray-900">
        <header className="fixed top-0 w-full flex justify-between items-center p-4 bg-gray-950 text-white">
            <div className="flex items-center">
                <img src="/steam-logo.png" alt="Logo" className="h-10 w-auto mr-3"/>
                <h1 className="text-xl">GameShop</h1>
            </div>
            <form onSubmit={handleSearch} className="flex items-center w-1/2 relative">
                <input 
                    className="border rounded-md p-2 flex-grow text-black pl-10" // Añadimos un padding a la izquierda para evitar que el texto se superponga con la imagen
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src="/lupa.png" alt="Buscar" className="absolute left-2 h-4 w-4" /> 
            </form>
            <div className="relative">
                <img onClick={handleDropdown} src="/user-profile.jpg" alt="User profile" className="h-10 w-10 cursor-pointer"/>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-black border border-border rounded-md overflow-hidden shadow-xl z-10">
                        <div className="py-1">
                        <p className="px-4 py-2 text-white">Logeado como {username}</p>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
        <main className="pt-20 max-w-7xl mx-auto px-6 sm:px-8"> {/* Ajusta pt-20 según sea necesario */}
        <h2 className="text-4xl text-center text-white py-8">Juegos Favoritos</h2> {/* Título antes de las tarjetas */}
        <ul
            role="list"
            className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 gap-8 mx-8"
        >
            {games.map((game) => {
                return (
                    <li key={game.appId} className="bg-gray-800 rounded-lg p-6">
                        <a href={game.url}>
                            <img className="aspect-[3/2] w-full object-contain object-center rounded" src={game.imgUrl} alt={game.title} />
                            <h3 className="mt-6 text-xl font-semibold leading-8 tracking-tight text-white">{game.title}</h3>
                            <p className="text-base leading-7 text-gray-300">Valoración del {game.reviewSummary} positiva</p>
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    {game.discountedPrice ? (
                                        <>
                                            <p className="text-base leading-7 text-white">
                                                Precio original: <span className='line-through'>{game.originalPrice === '0,00€' ? 'Gratis' : game.originalPrice}</span>
                                            </p>
                                            <p className="text-base leading-7 text-white">
                                                Precio rebajado: {game.discountedPrice === '0,00€' ? 'Gratis' : game.discountedPrice}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-base leading-7 text-white">
                                            Precio: {game.originalPrice === '0,00€' ? 'Gratis' : game.originalPrice}
                                        </p>
                                    )}
                                </div>
                                <img
                                    className="w-6 h-6"
                                    src="/Estrella_llena.png"
                                    alt="Wishlist status"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleRemoveFromWishlist(game.appId);
                                    }}
                                />
                            </div>
                        </a>
                    </li>
                );
            })}
            </ul>
        </main>
    </div>
    );
}

export default Favorites;
