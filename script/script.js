document.addEventListener('DOMContentLoaded', function () {
    const bitmoji = document.getElementById('bitmojiimg');
    const minWidth = 600;
    const minHeight = 505;

    function checkWindowSize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (windowWidth <= minWidth || windowHeight <= minHeight) {
            if (!bitmoji.classList.contains('hidden')) {
                bitmoji.classList.add('hidden');
                console.log("Bitmoji caché avec fondu.");
            }
        } else {
            if (bitmoji.classList.contains('hidden')) {
                bitmoji.classList.remove('hidden');
                console.log("Bitmoji affiché avec fondu.");
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiKey = 'TA_CLE_API'; // <-- Remplace par ta clé OpenWeatherMap
    
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`)
                    .then(response => response.json())
                    .then(data => {
                        const temp = Math.round(data.main.temp);
                        const city = data.name;
                        const weather = data.weather[0].description;
                        const icon = data.weather[0].icon;
    
                        document.getElementById('weather').innerHTML = `
                            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weather}" style="vertical-align: middle;">
                            ${city}, ${temp}°C - ${weather}
                        `;
                    })
                    .catch(error => {
                        console.error("Erreur lors de l’appel à l’API météo :", error);
                    });
            },
            error => {
                alert("La localisation est nécessaire pour afficher la météo.");
                console.error("Erreur de géolocalisation :", error);
            }
        );
    })
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const clockElement = document.getElementById('clock');
    
        clockElement.textContent = `${hours}:${minutes}`;
    }
    
    // Met à jour l'heure dès le chargement
    updateClock();
    // Puis chaque minute (ou chaque seconde si tu veux être plus précis)
    setInterval(updateClock, 1000);
});
