// Dentro de showTrivia
if (ref.year === 2017) {
    renderizarCrucigrama(ref);
} else {
    renderizarPregunta(); // La trivia normal
}

function renderizarCrucigrama(ref) {
    const data = anniversaryData[ref.year][ref.preguntaActual];
    const contenedor = document.getElementById("trivia-opciones");
    const preguntaEl = document.getElementById("trivia-pregunta");

    preguntaEl.innerText = data.pista; // Mostramos la pista aquí

    let inputsHTML = `<div class="crucigrama-inputs">`;
    for(let i = 0; i < data.longitud; i++) {
        // Agregamos el evento oninput para el salto automático
        inputsHTML += `<input type="text" maxlength="1" class="celda-letra" id="letra-${i}" 
                       oninput="if(this.value.length === 1) document.getElementById('letra-${i+1}')?.focus()">`;
    }
    inputsHTML += `</div>`;
    
    contenedor.innerHTML = `
        ${inputsHTML}
        <button class="boton-comprobar" onclick="validarCrucigrama('${data.respuesta}', ${ref.index})">Comprobar</button>
    `;
}

function validarCrucigrama(palabraCorrecta, refIndex) {
    let respuestaUsuario = "";
    for(let i = 0; i < palabraCorrecta.length; i++) {
        respuestaUsuario += document.getElementById(`letra-${i}`).value.toUpperCase();
    }
    
    if(respuestaUsuario === palabraCorrecta) {
        // Aquí conectamos con tu lógica original de éxito
        window.currentPlanet.aciertos++;
        // Si tienes más preguntas, avanzamos. Si es la última, cerramos.
        // Puedes llamar a una función que maneje el avance o cierre igual que en tu trivia.
        alert("¡Correcto! ❤️");
        // Lógica para pasar a la siguiente pregunta o finalizar
    } else {
        alert("¡Ups! Inténtalo de nuevo.");
    }
}