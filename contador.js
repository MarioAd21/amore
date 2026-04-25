/* contador.js */
const fechaInicio = new Date(2016, 10, 21, 0, 0, 0); // 21 de noviembre de 2016

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

    const reloj = document.getElementById('reloj');
    if (reloj) {
        reloj.innerHTML = `
            <div class="bloque-fecha">${años} años, ${meses} meses, ${dias} días</div>
            <div class="bloque-tiempo">${h}h : ${m}m : ${s}s</div>`;
    }
}

// Lógica del título de la pestaña
setInterval(() => {
    document.title = (new Date().getSeconds() % 2 === 0) ? "❤️ 21-11-2016" : "🖤 21-11-2016";
}, 1000);