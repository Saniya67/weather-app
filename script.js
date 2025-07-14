document.addEventListener("DOMContentLoaded", () => {
  const weatherDiv = document.getElementById('weather');
  const apiKey = "cd9dc38f7fbc796e8cbe7397a8f33689";  // replace with your real API key

  // Check if browser supports geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log("API response:", data); // always good to see the full data

            if (data.cod === 200) {
              const temp = data.main.temp;
              const description = data.weather[0].description;
              const icon = data.weather[0].icon;

              weatherDiv.innerHTML = `
                <h2>${data.name}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                <p>${description}</p>
                <p><strong>${temp}°C</strong></p>
              `;
            } else {
              console.error("API error:", data);
              weatherDiv.innerHTML = "<p>Could not fetch weather data.</p>";
            }
          })
          .catch(error => {
            console.error("Fetch error:", error);
            weatherDiv.innerHTML = "<p>Could not fetch weather data.</p>";
          });
      },
      error => {
        console.error("Geolocation error:", error);
        weatherDiv.innerHTML = "<p>Could not get your location.</p>";
      }
    );
  } else {
    weatherDiv.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
  }
});


       