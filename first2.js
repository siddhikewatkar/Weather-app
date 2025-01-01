// // HTML Element References
// const cityInput = document.getElementById("city_input");
// const searchBtn = document.getElementById("searchBtn");
// const locationBtn = document.getElementById("locationBtn");

// const currentWeatherCard = document.querySelector("#weather-left #card");
// const fiveDaysForecastCard = document.querySelector("#day-forecast");
// const aqiCard = document.querySelector("#highlights #card");
// const sunriseCard = document.querySelectorAll("#highlights #card")[1];

// const humidityVal = document.getElementById('humidityVal');
// const pressureVal = document.getElementById('pressureVal');
// const visibilityVal = document.getElementById('visibilityVal');
// const windSpeedVal = document.getElementById('windSpeedVal');
// const feelsVal = document.getElementById('feelsVal');
// const hourlyForecastCard = document.querySelector('#hourly-forecast');

// const aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

// // OpenWeatherMap API Key
// const apiKey = "d658c9814e01d34aaff8d998e1863142";

// // Helper Arrays
// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

// // Fetch and Display Weather Details
// async function fetchWeatherDetails(name, lat, lon, country, state) {
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//     try {
//         const airPollutionResponse = await fetch(airPollutionUrl);
//         const airPollutionData = await airPollutionResponse.json();
//         displayAirQualityIndex(airPollutionData);

//         const weatherResponse = await fetch(weatherUrl);
//         const weatherData = await weatherResponse.json();
//         displayCurrentWeather(weatherData, name, country);

//         const forecastResponse = await fetch(forecastUrl);
//         const forecastData = await forecastResponse.json();
//         displayHourlyForecast(forecastData.list);
//         displayFiveDayForecast(forecastData.list);
//     } catch (error) {
//         alert('Failed to fetch weather data');
//     }
// }

// function displayAirQualityIndex(data) {
//     const { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
//     const aqiIndex = data.list[0].main.aqi - 1;
//     aqiCard.innerHTML = `
//         <div id="card-head" class="flex justify-between mb-2.5">
//             <p class="text-lg font-bold">Air Quality Index</p>
//             <p class="air-index aqi-${aqiIndex}">${aqiList[aqiIndex]}</p>
//         </div>
//         <div id="air-indices" class="grid grid-cols-4 place-items-center">
//             ${createAirQualityItem('PM2.5', pm2_5)}
//             ${createAirQualityItem('PM10', pm10)}
//             ${createAirQualityItem('SO2', so2)}
//             ${createAirQualityItem('CO', co)}
//             ${createAirQualityItem('NO', no)}
//             ${createAirQualityItem('NO2', no2)}
//             ${createAirQualityItem('NH3', nh3)}
//             ${createAirQualityItem('O3', o3)}
//         </div>`;
// }

// function createAirQualityItem(label, value) {
//     return `
//         <div id="items">
//             <p class="text-center">${label}</p>
//             <h2 class="font-bold">${value}</h2>
//         </div>`;
// }

// function displayCurrentWeather(data, cityName, country) {
//     const date = new Date();
//     const tempCelsius = (data.main.temp - 273.15).toFixed(2);
//     const weatherDescription = data.weather[0].description;
//     const weatherIcon = data.weather[0].icon;
//     const { sunrise, sunset, timezone, visibility, humidity, pressure, feels_like } = data.sys;
//     const windSpeed = data.wind.speed;

//     currentWeatherCard.innerHTML = `
//         <div id="current-weather" class="flex justify-between items-center">
//             <div id="details">
//                 <p class="text-sm text-white font-bold">Now</p>
//                 <h2 class="text-3xl font-medium mx-2">${tempCelsius}&deg; C</h2>
//                 <p class="text-white mx-2">${weatherDescription}</p>
//             </div>
//             <div id="weather-icons">
//                 <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" />
//             </div>
//         </div>
//         <hr class="mb-2.5" />
//         <div id="card-footer">
//             <p class="text-sm mb-3"><i class="fa fa-calendar mx-2"></i>${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</p>
//             <p class="text-sm mb-3"><i class="fa fa-location-dot mx-2"></i>${cityName}, ${country}</p>
//         </div>`;

//     displaySunriseSunset(sunrise, sunset, timezone);
//     updateWeatherValues(humidity, pressure, visibility, windSpeed, feels_like);
// }

// function displaySunriseSunset(sunrise, sunset, timezone) {
//     const sunriseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A');
//     const sunsetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
//     sunriseCard.innerHTML = `
//         <div id="card-head">
//             <p class="text-lg font-bold">Sunrise & Sunset</p>
//         </div>
//         <div id="sunrise-sunset" class="grid grid-cols-2 mb-5">
//             <div id="item" class="flex items-center gap-2.5">
//                 <div id="icon">
//                     <img src="sunrise (7)(1).png" alt="" />
//                 </div>
//                 <div>
//                     <p class="mb-3">Sunrise</p>
//                     <h2 class="font-bold mt-4">${sunriseTime}</h2>
//                 </div>
//             </div>
//             <div id="item" class="flex items-center gap-2.5">
//                 <div id="icon">
//                     <img src="sunset(1).png" alt="" />
//                 </div>
//                 <div>
//                     <p class="mb-3 ">Sunset</p>
//                     <h2 class="font-bold mt-4">${sunsetTime}</h2>
//                 </div>
//             </div>
//         </div>`;
// }

// function updateWeatherValues(humidity, pressure, visibility, windSpeed, feelsLike) {
//     humidityVal.innerHTML = `${humidity}%`;
//     pressureVal.innerHTML = `${pressure} hPa`;
//     visibilityVal.innerHTML = `${visibility / 1000} km`;
//     windSpeedVal.innerHTML = `${windSpeed} m/s`;
//     feelsVal.innerHTML = `${(feelsLike - 273.15).toFixed(2)}&deg; C`;
// }

// function displayHourlyForecast(hourlyForecast) {
//     hourlyForecastCard.innerHTML = '';
//     for (let i = 0; i < 8; i++) {
//         const forecast = hourlyForecast[i];
//         const forecastDate = new Date(forecast.dt_txt);
//         const hours = formatHours(forecastDate.getHours());
//         const tempCelsius = (forecast.main.temp - 273.15).toFixed(2);
//         const weatherIcon = forecast.weather[0].icon;

//         hourlyForecastCard.innerHTML += `
//             <div id="card" class="text-center">
//                 <p>${hours}</p>
//                 <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="" class="mx-8"/>
//                 <p>${tempCelsius}&deg; C</p>
//             </div>`;
//     }
// }

// function formatHours(hours) {
//     const period = hours < 12 ? 'AM' : 'PM';
//     if (hours === 0) hours = 12;
//     if (hours > 12) hours -= 12;
//     return `${hours} ${period}`;
// }

// function displayFiveDayForecast(fiveDayForecast) {
//     const uniqueForecastDays = [];
//     const filteredForecasts = fiveDayForecast.filter(forecast => {
//         const forecastDate = new Date(forecast.dt_txt).getDate();
//         if (!uniqueForecastDays.includes(forecastDate)) {
//             uniqueForecastDays.push(forecastDate);
//             return true;
//         }
//         return false;
//     });

//     fiveDaysForecastCard.innerHTML = '';
//     for (let i = 1; i < filteredForecasts.length; i++) {
//         const forecast = filteredForecasts[i];
//         const forecastDate = new Date(forecast.dt_txt);
//         const tempCelsius = (forecast.main.temp - 273.15).toFixed(2);
//         const weatherIcon = forecast.weather[0].icon;

//         fiveDaysForecastCard.innerHTML += `
//             <div id="forecast-item" class="grid grid-cols-3 place-items-center mb-3.5">
//                 <div id="icon-wrapper" class="flex items-center">
//                     <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="" />
//                     <span>${tempCelsius}&deg; C</span>
//                 </div>
//                 <p>${forecastDate.getDate()} ${months[forecastDate.getMonth()]}</p>
//                 <p>${days[forecastDate.getDay()]}</p>
//             </div>`;
//     }
// }

// async function fetchCityCoordinates() {
//     const cityName = cityInput.value.trim();
//     if (!cityName) return;

//     cityInput.value = "";
//     const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

//     try {
//         const response = await fetch(geocodingUrl);
//         const data = await response.json();
//         const { name, lat, lon, country, state } = data[0];
//         fetchWeatherDetails(name, lat, lon, country, state);
//     } catch (error) {
//         alert(`Failed to fetch coordinates of ${cityName}`);
//     }
// }

// function fetchUserCoordinates() {
//     navigator.geolocation.getCurrentPosition(async position => {
//         const { latitude, longitude } = position.coords;
//         const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

//         try {
//             const response = await fetch(reverseGeocodingUrl);
//             const data = await response.json();
//             const { name, country, state } = data[0];
//             fetchWeatherDetails(name, latitude, longitude, country, state);
//         } catch (error) {
//             alert('Failed to fetch user coordinates');
//         }
//     });
// }

// // Event Listeners
// searchBtn.addEventListener("click", fetchCityCoordinates);
// locationBtn.addEventListener("click", fetchUserCoordinates);
