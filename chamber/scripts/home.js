const year = new Date().getFullYear();
document.getElementById("copyright").textContent = `© ${year} • WDD 231`;
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

const OW_KEY = "923ff7031764224ec3b6c9ea4e12c4dc";
const LAT = 19.43;  
const LON = -99.13;
const UNITS = "metric"; 

const currentTemp = document.getElementById("current-temp");
const currentDesc = document.getElementById("current-desc");
const iconImg = document.getElementById("weather-icon");
const unitSpan = document.getElementById("unit");
const forecastWrap = document.querySelector(".forecast");

unitSpan.textContent = UNITS === "imperial" ? "F" : "C";

async function loadWeather(){
  try{
    const curUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${OW_KEY}`;
    const curRes = await fetch(curUrl);
    if(!curRes.ok) throw new Error(await curRes.text());
    const cur = await curRes.json();

    const temp = Math.round(cur.main.temp);
    const desc = cur.weather?.[0]?.description ?? "—";
    const icon = cur.weather?.[0]?.icon ?? "01d";

    currentTemp.textContent = temp;
    currentDesc.textContent = desc[0].toUpperCase() + desc.slice(1);
    iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    iconImg.alt = desc;

    const fcUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${OW_KEY}`;
    const fcRes = await fetch(fcUrl);
    if(!fcRes.ok) throw new Error(await fcRes.text());
    const fc = await fcRes.json();

    const days = {};
    for(const row of fc.list){
      const date = new Date(row.dt * 1000);
      const dayKey = date.toLocaleDateString("en-US", { weekday: "short" });
      const hour = date.getHours();
      if(!days[dayKey] || Math.abs(hour - 12) < Math.abs(days[dayKey].hour - 12)){
        days[dayKey] = { temp: Math.round(row.main.temp), icon: row.weather?.[0]?.icon, desc: row.weather?.[0]?.description, hour };
      }
    }

    const todayKey = new Date().toLocaleDateString("en-US", { weekday: "short" });
    const ordered = Object.entries(days).filter(([k]) => k !== todayKey).slice(0,3);

    forecastWrap.innerHTML = "";
    ordered.forEach(([label, info]) => {
      const card = document.createElement("div");
      card.className = "fore-day";
      card.innerHTML = `
        <div style="font-weight:600">${label}</div>
        <img src="https://openweathermap.org/img/wn/${info.icon}.png" alt="${info.desc}" width="40" height="40" loading="lazy">
        <div>${info.temp}°${UNITS === "imperial" ? "F" : "C"}</div>
      `;
      forecastWrap.appendChild(card);
    });

  }catch(err){
    console.error("Weather error:", err);
    currentDesc.textContent = "Weather unavailable";
  }
}
loadWeather();

const spotWrap = document.getElementById("spotlight-wrap");

async function loadSpotlights(){
  try{
    const res = await fetch("data/members.json");
    if(!res.ok) throw new Error(await res.text());
    const data = await res.json();

    const eligible = data.members.filter(m => m.membership === 2 || m.membership === 3);
    // shuffle
    for(let i = eligible.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }
    const count = Math.random() < 0.5 ? 2 : 3;
    const picks = eligible.slice(0, count);

    spotWrap.innerHTML = "";
    picks.forEach(m => {
      const item = document.createElement("article");
      item.className = "spot";
      item.innerHTML = `
        <img src="${m.image}" alt="${m.name} logo" width="56" height="56" loading="lazy">
        <div>
          <h3>${m.name}</h3>
          <div class="meta">${m.address}</div>
          <div class="meta">${m.phone}</div>
          <a href="${m.website}" target="_blank" rel="noopener">Website</a>
          <div class="meta">Level: ${m.membership === 3 ? "Gold" : "Silver"}</div>
        </div>
      `;
      spotWrap.appendChild(item);
    });
  }catch(err){
    console.error("Spotlights error:", err);
    spotWrap.textContent = "Unable to load spotlights.";
  }
}
loadSpotlights();
