/* script.js */

// --- 1. CONFIGURACIÓN Y VARIABLES GLOBALES ---
const misRecuerdos = [
    { url: 'foto1.jpg', msj: 'El día que nos conocimos... ❤️' },
    { url: 'foto2.jpg', msj: 'Nuestra primera salida juntos.' },
    { url: 'foto3.jpg', msj: 'Te veías hermosa esa tarde.' },
    { url: 'foto4.jpg', msj: 'Construyendo sueños juntos.' },
    { url: 'foto5.jpg', msj: '10 años de pura magia.' },
    { url: 'foto6.jpg', msj: 'Te amo cada día más.' }
];

let indiceActual = 0;
const total = misRecuerdos.length;
const contenedor = document.getElementById('contenedor');
let touchStartX = 0;
let puedeGirar = true;
let carruselPausado = false; // Control para detener el giro automático al ver una foto
const cooldown = 400;     
const sensibilidad = 80;  

// Fecha de inicio corregida a 2016
const fechaInicio = new Date(2016, 10, 21, 0, 0, 0); 

// --- 2. FUNCIONES DE TIEMPO Y TÍTULO ---

setInterval(() => {
    document.title = (new Date().getSeconds() % 2 === 0) ? "❤️ 21-11-2016" : "🖤 21-11-2016";
}, 1000);

function actualizarContador() {
    const ahora = new Date();
    let años = ahora.getFullYear() - fechaInicio.getFullYear();
    let meses = ahora.getMonth() - fechaInicio.getMonth();
    let dias = ahora.getDate() - fechaInicio.getDate();
    
    if (dias < 0) { 
        meses--; 
        dias += new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate(); 
    }
    if (meses < 0) { 
        años--; 
        meses += 12; 
    }
    
    const h = ahora.getHours().toString().padStart(2, '0');
    const m = ahora.getMinutes().toString().padStart(2, '0');
    const s = ahora.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('reloj').innerHTML = `
        <div class="bloque-fecha">${años} años, ${meses} meses, ${dias} días</div>
        <div class="bloque-tiempo">${h}h : ${m}m : ${s}s</div>`;
}

// --- 3. INICIALIZACIÓN Y EVENTOS ---

function inicializar() {
    // Crear las cartas
    misRecuerdos.forEach((r, i) => {
        const img = document.createElement('img');
        img.src = r.url;
        img.className = 'foto-card oculta';
        img.id = 'img-' + i;
        img.onclick = () => { 
            if(img.classList.contains('pos-centro')) abrirFoto(r.url, r.msj); 
        };
        contenedor.appendChild(img);
    });
    
    actualizarAbanico();

    // Evento de rueda del ratón (Scroll Independiente)
    contenedor.addEventListener('wheel', (e) => {
        e.preventDefault(); // Bloquea el movimiento de la página
        
        if (!puedeGirar) return;

        if (Math.abs(e.deltaY) > 5) { 
            puedeGirar = false;
            indiceActual = (indiceActual + (e.deltaY > 0 ? 1 : -1) + total) % total;
            actualizarAbanico();
            setTimeout(() => { puedeGirar = true; }, cooldown);
        }
    }, { passive: false });

    // Eventos Táctiles
    contenedor.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX);
    contenedor.addEventListener('touchmove', (e) => {
        if (!puedeGirar) return;
        const diff = touchStartX - e.touches[0].clientX;
        if (Math.abs(diff) > sensibilidad) {
            puedeGirar = false;
            indiceActual = (indiceActual + (diff > 0 ? 1 : -1) + total) % total;
            actualizarAbanico();
            setTimeout(() => { puedeGirar = true; }, cooldown);
        }
    });

    // Giro automático (solo si no está pausado por el modal)
    setInterval(() => { 
        if(puedeGirar && !carruselPausado) { 
            indiceActual = (indiceActual + 1) % total; 
            actualizarAbanico(); 
        } 
    }, 5000);
}

// --- 4. LÓGICA DEL CARRUSEL (ABANICO) ---

function actualizarAbanico() {
    const cards = document.querySelectorAll('.foto-card');
    cards.forEach(f => { f.className = 'foto-card oculta'; f.style.zIndex = "0"; });
    
    const getIdx = (off) => (indiceActual + off + total) % total;
    
    const mapa = [
        { idx: getIdx(0), clase: 'pos-centro', z: 50 },
        { idx: getIdx(1), clase: 'pos-d1', z: 40 },
        { idx: getIdx(2), clase: 'pos-d2', z: 30 },
        { idx: getIdx(3), clase: 'pos-d3', z: 20 },
        { idx: getIdx(-1), clase: 'pos-i1', z: 40 },
        { idx: getIdx(-2), clase: 'pos-i2', z: 30 },
        { idx: getIdx(-3), clase: 'pos-i3', z: 20 }
    ];
    
    mapa.forEach(item => {
        const el = document.getElementById('img-' + item.idx);
        if (el) { 
            el.className = 'foto-card ' + item.clase; 
            el.style.zIndex = item.z; 
        }
    });
}

// --- 5. MODAL Y REPRODUCTOR ---

function abrirFoto(url, msj) {
    carruselPausado = true; // Pausa el giro automático
    const modal = document.getElementById('modal-foto');
    document.getElementById('img-modal').src = url;
    document.getElementById('texto-mensaje').innerText = msj;
    modal.classList.remove('modal-oculto');
}

function cerrarFoto() {
    carruselPausado = false; // Reanuda el giro
    document.getElementById('modal-foto').classList.add('modal-oculto');
}

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

// Lanzamiento inicial
window.onload = () => { 
    actualizarContador(); 
    inicializar(); 
    setInterval(actualizarContador, 1000); 
};
