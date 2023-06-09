const API = "http://localhost:8081/api/login/user/register";


async function registro(){

    let datos = {};

    datos.contrasenia = document.getElementById('contrasena').value;
    datos.correo = document.getElementById('email').value;
    datos.nombre = document.getElementById('nombre').value;

    if(datos.contrasenia == document.getElementById('conf_contrasena').value){

        const rawResponse = await fetch(API, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        const content = await rawResponse.json();
        
        console.log(content);

    }else{

        alert('No coinciden las contraseñas');

    }

}