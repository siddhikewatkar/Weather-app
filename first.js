let cityInput = document.getElementById("city_input");
let searchBtn = document.getElementById("searchBtn");
let locationBtn = document.getElementById("locationBtn");
let api_key = "d658c9814e01d34aaff8d998e1863142";
currentWeatherCard = document.querySelectorAll(" #weather-left #card")[0];
const fiveDaysForecastCard = document.querySelector(" #day-forecast ");
aqiCard = document.querySelectorAll(" #highlights #card")[0];
sunriseCard = document.querySelectorAll(" #highlights #card")[1];
humidityVal = document.getElementById('humidityVal');
pressureVal = document.getElementById('pressureVal');
visibilityVal = document.getElementById('visibilityVal');
windSpeedVal = document.getElementById('windSpeedVal');
feelsVal = document.getElementById('feelsVal');
hourlyForecastCard =document.querySelector('#hourly-forecast');
aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

function getWeatherDetails(name, lat, lon, country, state) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
      WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
      AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,


  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
  fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
    let{co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
      aqiCard.innerHTML = `
         <div id="card-head" class="flex justify-between mb-2.5">
                <p class="text-lg font-bold">Air Quality Index</p>
                <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
              </div>
              <div id="air-indices" class="grid grid-cols-4 place-items-center">
                <i class="fa-solid fa-wind fa-3x"></i>
                <div id="items">
                  <p class="text-center">PM2.5</p>
                  <h2 class="font-bold">${pm2_5}</h2>
                </div>
                <div id="items">
                  <p class="text-center">PM10</p>
                  <h2 class="font-bold">${pm10}</h2>
                </div>
                <div id="items">
                  <p class="text-center">SO2</p>
                  <h2 class="font-bold">${so2}</h2>
                </div>
                <div id="items">
                  <p class="text-center">CO</p>
                  <h2 class="font-bold">${co}</h2>
                </div>
                <div id="items">
                  <p class="text-center">NO</p>
                  <h2 class="font-bold">${no}</h2>
                </div>
                <div id="items">
                  <p class="text-center">NO2</p>
                  <h2 class="font-bold">${no2}</h2>
                </div>
                <div id="items">
                  <p class="text-center">NH3</p>
                  <h2 class="font-bold">${nh3}</h2>
                </div>
                <div id="items">
                  <p class="text-center">O3</p>
                  <h2 class="font-bold">${o3}</h2>
                </div>
              </div>
      `;
  }).catch(()=> {
    alert('Failed to fetch Air Quality index')
  })


  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      currentWeatherCard.innerHTML = `
     <div id="current-weather" class="flex justify-between items-center">
              <div id="details">
                <p class="text-sm text-white font-bold">Now</p>

                <h2 class="text-3xl font-medium mx-2">${(
                  data.main.temp - 273.15
                ).toFixed(2)}&deg; C</h2>

                <p class="text-white mx-2">${data.weather[0].description}</p>
              </div>
              <div id="weather-icons">
                <img
                  src="https://openweathermap.org/img/wn/${
                    data.weather[0].icon
                  }@2x.png"
                />
              </div>
            </div>
            <hr class="mb-2.5" />
            <div id="card-footer">
              <p class="text-sm mb-3 "><i class="fa fa-calendar mx-2"></i>${
                days[date.getDay()]
              }, ${date.getDate()}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}</p>
              <p class="text-sm mb-3">
                <i class="fa fa-location-dot mx-2"></i>${name}, ${country}
              </p>
            </div>
            </div> `;

    let {sunrise, sunset} = data.sys;
    let {timezone, visibility} = data;
    let {humidity, pressure, feels_like} = data.main;
    let {speed} = data.wind;
     let sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A');
     let sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
     sunriseCard.innerHTML = `
      <div id="card-head">
                <p class="text-lg font-bold">Sunrise & Sunset</p>
              </div>
              <div id="sunrise-sunset" class="grid grid-cols-2 mb-5">
                <div id="item" class="flex items-center gap-2.5">
                  <div id="icon">
                    <img src="sunrise (7)(1).png" alt="" />
                  </div>
                  <div>
                    <p class="mb-3">Sunrise</p>
                    <h2 class="font-bold mt-4">${sRiseTime}</h2>
                  </div>
                </div>

                <div id="item" class="flex items-center gap-2.5">
                  <div id="icon">
                    <img src="sunset(1).png" alt="" />
                  </div>
                  <div>
                    <p class="mb-3 ">Sunset</p>
                    <h2 class="font-bold mt-4">${sSetTime}</h2>
                  </div>
                </div>
              </div>
     `;
     
     humidityVal.innerHTML = `${humidity}%`;
     pressureVal.innerHTML = `${pressure}hPa`;
     visibilityVal.innerHTML = `${visibility/1000}km`;
     windSpeedVal.innerHTML = `${speed}m/s`;
     feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    })
    .catch(() => {
      alert("Failed to fetch current weather");
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let hourlyForecast = data.list;
      hourlyForecastCard.innerHTML = '';
      for(i = 0; i<8; i++){
        let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
        let hr = hrForecastDate.getHours();
        let a = 'PM';
        if(hr < 12) a = 'AM';
        if(hr == 0) hr = 12;
        if(hr > 12)hr = hr - 12;
        hourlyForecastCard.innerHTML += `
          <div id="card" class="text-center">
              <p>${hr} ${a}</p>
              <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="" class="mx-8"/>
              <p>${(hourlyForecast[i].main.temp -273.15). toFixed(2)}&deg;C</p>
            </div>
        `;
      }
      let uniqueForecastDays =[];
      let fiveDaysForecast = data.list.filter(forecast => {
        let forecastDate =new Date(forecast.dt_txt).getDate();
        if(!uniqueForecastDays.includes(forecastDate)){
          return uniqueForecastDays.push(forecastDate);
        }
      })
      fiveDaysForecastCard.innerHTML = '';
      for(i=1; i<fiveDaysForecast.length; i++){
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `
         <div id="forecast-item"
                class="grid grid-cols-3 place-items-center mb-3.5">
                <div id="icon-wrapper" class="flex items-center">
                  <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="" />
                  <span>${(fiveDaysForecast[i].main.temp - 273.15). toFixed(2)}&deg;C</span>
                </div>
                <p>${date.getDate()} ${months[date.getMonth()]}</p>
                <p>${days[date.getDay()]}</p>
              </div>
        `;
      }
    })
    .catch(() => {
      alert("Failed to fetch weather forecast");
    });
}

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) returns;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

function getUserCoordinates(){
  navigator.geolocation.getCurrentPosition(position =>{
    let {latitude, longitude} = position.coords;
    let REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
   
    fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
       let {name, country, state} = data[0];
       getWeatherDetails(name, latitude, longitude, country, state);
    }).catch(()=> {
      alert('Failed to fetch user Coordinates')
    })
  })
}

searchBtn.addEventListener("click", getCityCoordinates);
locationBtn.addEventListener("click", getUserCoordinates);
