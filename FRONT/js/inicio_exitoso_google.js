function iniciar(){

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    
    //Comprobar si el token esta vacio
    if(accessToken){

        // Guardar el token en el almacenamiento del navegador
        localStorage.setItem('token', accessToken);
    
        // Redirigir a la nueva página
        window.location.replace("home.html");
    
    }else{
        console.log(accessToken);
        alert('No has introducido un ususario o contraseña correctos');
    }

}
