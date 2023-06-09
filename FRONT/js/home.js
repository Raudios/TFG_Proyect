const API = "http://localhost:8081/api/login/user/datapls";

async function peticion(){

    const token = localStorage.getItem('token');

    console.log(token)

    const response = await fetch(API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    const content = await response.json();

    const nombre_usuario = document.getElementById("nombre_usuario");
    console.log(content.message)
	nombre_usuario.innerHTML = "Estas logeado como " + content.message;
}