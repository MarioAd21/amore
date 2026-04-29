
const startDate = new Date(2016, 10, 21, 0, 0, 0); 

function updateTimer() {
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) { 
        months--; 
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate(); 
    }
    
    if (months < 0) { 
        years--; 
        months += 12; 
    }

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timerDisplay = document.getElementById('reloj');
    
    if (timerDisplay) {
        timerDisplay.innerHTML = `
            <div class="bloque-fecha">${years} Años - ${months} Meses - ${days} Dias</div>
            <div class="contador-grid">
                <div class="tiempo-box"><span>${hours}</span><label>Hours</label></div>
                <div class="tiempo-box"><span>${minutes}</span><label>Minutes</label></div>
                <div class="tiempo-box"><span>${seconds}</span><label>Seconds</label></div>
            </div>`;
    }
}

setInterval(updateTimer, 1000);
updateTimer(); 

setInterval(() => {
    const isEven = new Date().getSeconds() % 2 === 0;
    document.title = isEven ? "❤️ 21-11-2016" : "🖤 21-11-2016";
}, 1000);