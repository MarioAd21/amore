const startDate = new Date(2016, 10, 21, 0, 0, 0); 

function updateTimer() {
    // CAPTURA ÚNICA: Evita el desfase entre milisegundos
    const now = new Date();
    
    // Extraemos los valores de esa captura única
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    let years = currentYear - startDate.getFullYear();
    let months = currentMonth - startDate.getMonth();
    let days = currentDate - startDate.getDate();

    // Lógica de ajuste de días negativos
    if (days < 0) { 
        months--; 
        // Usamos el último día del mes anterior basado en nuestra captura 'now'
        const previousMonth = new Date(currentYear, currentMonth, 0);
        days += previousMonth.getDate(); 
    }
    
    // Lógica de ajuste de meses negativos
    if (months < 0) { 
        years--; 
        months += 12; 
    }

    // Formateo de tiempo con el mismo objeto 'now'
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timerDisplay = document.getElementById('reloj');
    
    if (timerDisplay) {
        timerDisplay.innerHTML = `
            <div class="bloque-fecha">${years} Años - ${months} Meses - ${days} Días</div>
            <div class="contador-grid">
                <div class="tiempo-box"><span>${hours}</span><label>Horas</label></div>
                <div class="tiempo-box"><span>${minutes}</span><label>Minutos</label></div>
                <div class="tiempo-box"><span>${seconds}</span><label>Segundos</label></div>
            </div>`;
    }
}

// Ejecución inicial y bucle
setInterval(updateTimer, 1000);
updateTimer(); 

// Sincronización del título (también usando una captura única)
setInterval(() => {
    const isEven = new Date().getSeconds() % 2 === 0;
    document.title = isEven ? "❤️ 21-11-2016" : "🖤 21-11-2016";
}, 1000);