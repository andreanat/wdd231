// ---- configuration ----
const LAT = 49.75;    // Trier latitude (2 decimals is fine)
const LON = 6.64;     // Trier longitude
const UNITS = "metric"; // 'metric' for °C or 'imperial' for °F
const API_KEY = "923ff7031764224ec3b6c9ea4e12c4dc";

// ---- DOM hooks ----
const tempEl = document.querySelector("#current-temp");
const iconEl = document.querySelector("#weather-icon");
const captionEl = document.querySelector("#weather-caption");

// OpenWeather current weather endpoint
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(await response.text());

    const data = await response.json();
    // console.table(data); // <— uncomment to inspect in DevTools
    displayResults(data);
  } catch (err) {
    console.error("Weather fetch failed:", err);
    tempEl.textContent = "unavailable";
    captionEl.textContent = "Unable to load weather right now.";
  }
}

function displayResults(data) {
  // temperature
  const temp = Math.round(data.main.temp);
  const unit = UNITS === "metric" ? "°C" : "°F";
  tempEl.textContent = `${temp} ${unit}`;

  // weather description + icon
  const [{ description, icon }] = data.weather;
  const prettyDesc = description.replace(/\b\w/g, (c) => c.toUpperCase());

  iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconEl.alt = description;
  captionEl.textContent = prettyDesc;
}

// kick it off
apiFetch();
