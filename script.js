const apiKey = "68c39c34119a634859dc42eddad20b89"; 

const countryNames = {
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", IN: "India", US: "United States",
  GB: "United Kingdom", CA: "Canada", AU: "Australia", FR: "France", DE: "Germany",
  JP: "Japan", CN: "China", BR: "Brazil", RU: "Russia", IT: "Italy", ES: "Spain",
  // Add more as needed
};


const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city === "") {
    result.innerHTML = "Please enter a city name.";
    return;
  }

  result.innerHTML = " Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      result.innerHTML = ` City not found. Please try again.`;
    } else {
      const countryFullName = countryNames[data.sys.country] || data.sys.country;

      result.innerHTML = `
        <h2>${data.name}, ${countryFullName}</h2>
        <p> Temperature: <strong>${data.main.temp}°C</strong></p>
        <p> Humidity: ${data.main.humidity}%</p>
        <p> Wind: ${data.wind.speed} m/s</p>
        <p> Condition: ${data.weather[0].description}</p>
      `;
    }
  } catch (err) {
    result.innerHTML = " Unable to fetch weather data.";
  }
});
