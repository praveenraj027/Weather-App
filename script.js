    const apiKey = "e33354f16254687a15b0f926b90ba40d"; 

    async function getWeather() {
        const city = document.getElementById("city").value.trim();
        const warningMessage = document.getElementById("warning-message");
        const weatherInfo = document.getElementById("weather-info");

        // Clear previous messages
        warningMessage.textContent = "";

        if (!city) {
            warningMessage.textContent = "⚠️ Please enter a city name.";
            weatherInfo.style.display = "none";
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.cod === 200) {
                document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
                document.getElementById("temperature").textContent = `🌡️ Temperature: ${data.main.temp}°C`;
                document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                document.getElementById("weather-icon").alt = data.weather[0].description;
                document.getElementById("weather-description").textContent = `🌤️ Weather: ${data.weather[0].description}`;
                document.getElementById("humidity").textContent = `${data.main.humidity}%`;
                document.getElementById("wind-speed").textContent = `${data.wind.speed} m/s`;

                weatherInfo.style.display = "block";
                warningMessage.textContent = "";
            } else {
                warningMessage.textContent = `❌ ${data.message}`;
                weatherInfo.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            warningMessage.textContent = "⚠️ Error fetching weather data. Please try again later.";
            weatherInfo.style.display = "none";
        }
    }

    document.getElementById("city").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            getWeather();
        }
    });
