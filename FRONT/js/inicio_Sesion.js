const API = "http://localhost:8081/api/login/user/login";
const API2 = "http://localhost:8081/api/login/user/login/google";
const GOOGLE_CLIENT_ID = "483162406056-ppi5hsh1h30e8lq51cjpnt0re0fvt3sd.apps.googleusercontent.com";

async function inicio(){

    let datos = {};

    datos.contrasenia = document.getElementById('contrasena').value;
    datos.correo = document.getElementById('email').value;

    const rawResponse = await fetch(API, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    //Recogemos el json devuelto por el back que deberia contener el token y guardamos el token en una variable
    const content = await rawResponse.json();   
    const token = content.token;

    //Comprobar si el token esta vacio
    if(token){
 
        // Guardar el token en el almacenamiento del navegador
        localStorage.setItem('token', token);
        console.log(token);

        // Redirigir a la nueva página
        window.location.replace("home.html");

    }else{
        
        console.log(content.message);
        
        alert('No has introducido un ususario o contraseña correctos');
    }
}

async function inicio_google(){
    
    const rawResponse = await fetch(API2, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    //Recogemos el json devuelto por el back que deberia contener el token y guardamos el token en una variable
    const content = await rawResponse.json();
    const link = content.link;
    console.log(link);
    window.location.replace(link);

}
//http://localhost:8081/api/login/callback?state=state_parameter_passthrough_value&code=4/0AbUR2VNKOu-CWkDIjyR5y1dJTzf5qPcDqoPUKc7SdK85acuZUbcEdMxA19RlWEKEZpd4_g&scope=email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&authuser=0&prompt=none