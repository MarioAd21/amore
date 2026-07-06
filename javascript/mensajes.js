function mostrarMensaje(palabra) {
    let mensaje = "";
    
    // Aquí defines qué mensaje sale según la palabra tocada
    switch(palabra) {
        case 'Caburgua':
            mensaje = "¡El mejor viaje! Aún recuerdo el frío que hacía esa noche y lo bien que la pasamos. ✨";
            break;
        case 'Luffy':
            mensaje = "Este Luffy es el guardián de nuestra estantería. ¡Fue una gran compra! 👒";
            break;
        case 'Spiderman':
            mensaje = "Nuestra primera cita de cine... recuerdo que estaba súper nervioso por estar contigo. 🕷️";
            break;
        default:
            mensaje = "¡Un recuerdo especial escondido solo para ti! ❤️";
    }

    // Ventana emergente elegante utilizando SweetAlert2
    Swal.fire({
        text: mensaje,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'cadetblue',
        background: '#121212',
        color: '#E0E0E0'
    });
}
