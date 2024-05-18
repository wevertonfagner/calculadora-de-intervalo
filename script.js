document.getElementById('intervalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startTimeInput = document.getElementById('startTime').value;
    const intervalTimeInput = document.getElementById('intervalTime').value;

    const startTime = parseTime(startTimeInput);
    const intervalTime = parseInterval(intervalTimeInput);

    const resultDiv = document.getElementById('result');
    
    if (startTime && intervalTime) {
        const resultTime = new Date(startTime.getTime() + intervalTime);
        resultDiv.innerHTML = `Você deve voltar às<br><br><span class="highlight">${formatTime(resultTime)}</span>`;
        resultDiv.style.display = 'block';
        resultDiv.classList.remove('error');
    } else {
        resultDiv.innerHTML = `<span class="highlight">Formato inválido!</span><br><br>Por favor, use os formatos corretos.`;
        resultDiv.style.display = 'block';
        resultDiv.classList.add('error');
    }
});

function parseTime(timeString) {
    const timePattern = /(\d{1,2})h(\d{1,2})m/;
    const match = timePattern.exec(timeString);
    if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const now = new Date();
        now.setHours(hours, minutes, 0, 0);
        return now;
    }
    return null;
}

function parseInterval(intervalString) {
    const hourPattern = /(\d+)h/;
    const minutePattern = /(\d+)m/;
    let hours = 0;
    let minutes = 0;

    const hourMatch = hourPattern.exec(intervalString);
    if (hourMatch) {
        hours = parseInt(hourMatch[1], 10);
    }

    const minuteMatch = minutePattern.exec(intervalString);
    if (minuteMatch) {
        minutes = parseInt(minuteMatch[1], 10);
    }

    if (hours > 0 || minutes > 0) {
        return (hours * 60 + minutes) * 60000;
    }
    return null;
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}h ${minutes}m`;
}
