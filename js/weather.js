document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "9bf6439a6cb4434a810181028231507"; 
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");

    getWeatherBtn.addEventListener("click", async function () {
        const cityName = cityInput.value.trim();
        if (cityName !== "") {
            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=5&key=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                displayWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                weatherInfo.innerHTML = "<p>Error fetching weather data.</p>";
            }
        }
    });

    function displayWeatherData(data) {
        const location = data.location.name;
        const forecastHtml = data.forecast.forecastday.map(day => `
            <div class="forecast-day">
                <h3>${day.date}</h3>
                <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                <p>Min Temp: ${day.day.mintemp_c}°C</p>
                <p>Condition: ${day.day.condition.text}</p>
            </div>
        `).join("");

        weatherInfo.innerHTML = `
            <h2>Weather Forecast for ${location}</h2>
            ${forecastHtml}
        `;
    }
});
