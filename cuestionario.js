/* cuestionario.js */
const datosAniversario = {
    "2016": [
        { 
            pregunta: "¿En qué fecha exacta te pedí pololeo?", 
            opciones: ["15 de Noviembre", "21 de Noviembre", "25 de Noviembre", "21 de Octubre"], 
            correcta: 1, 
            mensaje: "¡Exacto! El día que cambió nuestras vidas. ❤️" 
        },
        { 
            pregunta: "¿Dónde estábamos cuando te pedí que saliéramos?", 
            opciones: ["En el parque", "En el Liceo", "En una micro", "En el pin pon"], 
            correcta: 2, 
            mensaje: "¡Sí! Camino a casa en la micro. 🚌" 
        },
        { 
            pregunta: "¿A las cuántas semanas de amistad ya éramos 'Mejores Amigos'?", 
            opciones: ["1 semana", "2 semanas", "3 semanas", "4 semanas"], 
            correcta: 2, 
            mensaje: "¡Fue todo muy rápido! Éramos inseparables. ✨" 
        },
        { 
            pregunta: "¿Qué éramos en nuestra tercera semana de conocernos?", 
            opciones: ["Amigos", "Conocidos", "Inseparables", "Pololos"], 
            correcta: 2, 
            mensaje: "¡Así es! Ya no nos separábamos para nada. 😊" 
        },
        { 
            pregunta: "¿Dónde fue nuestro primer beso?", 
            opciones: ["En la plaza", "En una micro", "En el colegio", "En el cine"], 
            correcta: 1, 
            mensaje: "¡La micro fue nuestro lugar especial ese año! 😘" 
        },
        { 
            pregunta: "¿Después de qué actividad nos dimos nuestro primer beso?", 
            opciones: ["Después de clases", "Después de Brigada", "Después de Pin Pon", "En el recreo"], 
            correcta: 2, 
            mensaje: "¡Después de jugar un buen partido de Pin Pon! 🏓" 
        },
        { 
            pregunta: "¿En qué otra actividad participábamos juntos además de Pin Pon?", 
            opciones: ["Coro", "Brigada", "Fútbol", "Teatro"], 
            correcta: 1, 
            mensaje: "¡En Brigada! Siempre juntos. 👮‍♂️👮‍♀️" 
        },
        { 
            pregunta: "¿A qué hora del día te pedí pololeo?", 
            opciones: ["En la mañana", "Al mediodía", "En la tarde", "En la noche"], 
            correcta: 2, 
            mensaje: "¡En una linda tarde de noviembre! 🌅" 
        },
        { 
            pregunta: "¿A las cuántas semanas de conocernos nos hicimos pololos?", 
            opciones: ["2 semanas", "3 semanas", "4 semanas", "5 semanas"], 
            correcta: 2, 
            mensaje: "¡Al mes exacto ya estábamos saliendo! 🗓️" 
        },
        { 
            pregunta: "¿Cómo le decimos en Chile a salir con alguien oficialmente?", 
            opciones: ["Pololeo", "Andar", "Pololear", "Pinchar"], 
            correcta: 0, 
            mensaje: "¡Nuestro pololeo que ya lleva 10 años! ❤️" 
        }
    ],
    "2017": [
        { 
            pregunta: "¿Qué te regalé para el primer San Valentín (14 de febrero)?", 
            opciones: ["Flores", "Un peluche", "Un chocolate", "Una carta"], 
            correcta: 2, 
            mensaje: "¡Un dulce detalle para alguien dulce! 🍫" 
        },
        { 
            pregunta: "¿A qué película fuimos en nuestra primera cita al cine?", 
            opciones: ["Avengers", "Rápidos y Furiosos 8", "Toy Story", "La Bella y la Bestia"], 
            correcta: 1, 
            mensaje: "¡Adrenalina pura en nuestra primera cita! 🚗💨" 
        },
        { 
            pregunta: "¿Qué hacía yo cuando salía temprano de mis clases?", 
            opciones: ["Irme a dormir", "Jugar fútbol", "Iba a buscarte", "Hacer tareas"], 
            correcta: 2, 
            mensaje: "¡Siempre iba por ti, no importaba la espera! 🏫" 
        },
        { 
            pregunta: "¿Dónde guardaba yo todas las cartas que nos escribíamos?", 
            opciones: ["En una caja", "En mi mochila", "En mi billetera", "En un cuaderno"], 
            correcta: 2, 
            mensaje: "¡Aún las guardo ahí después de tantos años! 💳" 
        },
        { 
            pregunta: "¿Cómo se llamaba el dulce que te regalaba en los recreos?", 
            opciones: ["Cariñito", "Beso", "Amor", "Bombón"], 
            correcta: 1, 
            mensaje: "¡Un 'Beso' en cada recreo! 🍬" 
        },
        { 
            pregunta: "¿Qué género era la película de nuestra primera cita?", 
            opciones: ["Terror", "Romántica", "Acción", "Comedia"], 
            correcta: 2, 
            mensaje: "¡Acción total con Toretto y la familia! 🏎️" 
        },
        { 
            pregunta: "¿Por qué podía ir a buscarte siempre a tu salida?", 
            opciones: ["Porque vivía cerca", "Porque salía temprano", "Porque faltaba a clases", "Porque no estudiaba"], 
            correcta: 1, 
            mensaje: "¡La ventaja de salir antes era verte más tiempo! 🕒" 
        },
        { 
            pregunta: "¿Aún conservo la billetera de las cartas?", 
            opciones: ["No, la perdí", "Sí, aún la tengo", "Se rompió", "La regalé"], 
            correcta: 1, 
            mensaje: "¡Es uno de mis tesoros más grandes! 💼" 
        },
        { 
            pregunta: "¿Qué solíamos escribirnos constantemente?", 
            opciones: ["Mensajes de texto", "Correos", "Cartas", "Poemas"], 
            correcta: 2, 
            mensaje: "¡Nuestras cartas de amor son historia pura! ✉️" 
        },
        { 
            pregunta: "¿En qué festividad terminó nuestra aventura del 2017?", 
            opciones: ["Fiestas Patrias", "Tu cumpleaños", "Navidad", "Año Nuevo"], 
            correcta: 2, 
            mensaje: "¡Nuestra segunda Navidad juntos! 🎄" 
        }
    ]
};