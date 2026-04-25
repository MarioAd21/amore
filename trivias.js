/* trivias.js */
let indicePregunta = 0;
let añoActual = "2016";

function cargarCuestionario(año) {
    añoActual = año;
    indicePregunta = 0;
    mostrarPregunta();
}

function mostrarPregunta() {
    const preguntas = datosAniversario[añoActual];
    const data = preguntas[indicePregunta];

    document.getElementById('contenedor-trivia').style.display = 'block';
    document.getElementById('trivia-titulo').innerText = `Año ${añoActual} - Pregunta ${indicePregunta + 1}/10`;
    document.getElementById('trivia-pregunta').innerText = data.pregunta;

    const opcionesDiv = document.getElementById('trivia-opciones');
    opcionesDiv.innerHTML = '';

    data.opciones.forEach((op, i) => {
        const btn = document.createElement('button');
        btn.innerText = op;
        btn.className = 'boton-opcion';
        btn.onclick = () => verificar(i);
        opcionesDiv.appendChild(btn);
    });
}

function verificar(seleccion) {
    const preguntas = datosAniversario[añoActual];
    if (seleccion === preguntas[indicePregunta].correcta) {
        alert(preguntas[indicePregunta].mensaje);
        indicePregunta++;

        if (indicePregunta < 10) {
            mostrarPregunta();
        } else {
            // ¡COMPLETO EL AÑO!
            lanzarFuegosCorazon(); // Esta función va en animaciones.js
            alert(`¡Felicidades Amore! Has completado el año ${añoActual}. ❤️`);
            
            // Lógica para desbloquear el siguiente año en el menú
            document.getElementById('contenedor-trivia').style.display = 'none';
        }
    } else {
        alert("¡Oh no! Ese recuerdo no es así... Intenta de nuevo. 💡");
    }
}