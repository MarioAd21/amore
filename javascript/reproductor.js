/* main.js */
function toggleReproductor() {
    const r = document.getElementById('reproductor-mini');
    const b = document.getElementById('boton-musica');
    if (r.classList.contains('oculto')) { 
        r.classList.remove('oculto'); 
        b.classList.add('boton-oculto'); 
    } else { 
        r.classList.add('oculto'); 
        b.classList.remove('boton-oculto'); 
    }
}
