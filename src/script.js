// ---search details--- //
const searchBtn = document.querySelectorAll(".searchBtn");
const currentBtn = document.querySelectorAll(".currentBtn");
const citySearched = document.querySelectorAll(".inputField");

// ---main card details--- //
const weatherIcon = document.getElementById("currMainIcon");
const current_weather = document.getElementById("weather");
const current_temperature = document.getElementById("cur_temperature");
const city = document.getElementById("city");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
// const apiKey = "df77161e8b524dcea26181828240510";
const apiKey = "afdce8e959ccad2851497a17c1796730";

// ----6 days forecast details---- //
const forecastCards = document.getElementById("forecastCards");
const forecastDays = document.getElementById("forecastDays");
const forecastDate = document.getElementById("forecastDate");
const forecastIcon = document.getElementById("forecastIcon");
const forecastTemperature = document.getElementById("forecastTemperature");
const forecastWeather = document.getElementById("forecastWeather");
const forecastMaxTemp = document.getElementById("forecastMaxTemp");
const forecastMinTemp = document.getElementById("forecastMinTemp");
const forecastWind = document.getElementById("forecastWind");
const forecastHumidity = document.getElementById("forecastHumidity");
const forecastVisibility = document.getElementById("forecastVisibility");

async function fetchWeather(name, lat, lon, state) {
  // const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
  // const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
  // const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error("City not Found");
    }
    const data = await response.json();
    console.log("weatherData = ", data);

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    current_weather.innerHTML = data.weather[0].main;
    current_temperature.innerHTML = (data.main.temp - 273.15).toFixed(0);
    city.innerHTML = data.name;
    country.innerHTML = data.sys.country;
    temperature.innerHTML = (data.main.temp - 273.15).toFixed(0);
    windSpeed.innerHTML = data.wind.speed;
    humidity.innerHTML = data.main.humidity;
    visibility.innerHTML = data.visibility / 1000;
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }

  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const forecastResponse = await fetch(forecastApiUrl);
    console.log(forecastResponse);
    if (!forecastResponse.ok) {
      throw new Error("City not Found");
    }
    const forecastData = await forecastResponse.json();
    console.log("forecastData = ", forecastData);
    let sixDaysForecast = [];
    let forcastDays = forecastData.list.filter((forecastday) => {
      let forecastDate = new Date(forecastday.dt_txt).getDate();
      if (!sixDaysForecast.includes(forecastDate)) {
        return sixDaysForecast.push(forecastDate);
      }
    });
    console.log(forcastDays);
    forecastCards.innerHTML = "";
    for (let forecastDay of forcastDays) {
      let date = new Date(forecastDay.dt_txt);
      console.log(date);
      console.log(date.getMonth());

      forecastCards.innerHTML += `
<div>
              <div
                class="flex flex-col bg-white/20 backdrop-blur-sm rounded p-4 w-full"
              >
                <!-- forecast day -->
                <div id="forecastDays" class="font-bold text-white text-xl">
                  Thursday
                </div>
                <!-- forecast date -->
                <div id="forecastDate" class="text-sm text-[#a8b9d7]">
                  10 May 2020
                </div>
                <!-- forecast icon -->
                <div
                  class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
                >
                  <img
              class="md:w-40 w-20 h-4w-25"
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
            />
                </div>
                <div class="flex flex-row items-center justify-center mt-6">
                  <!-- forecast temperature -->
                  <div
                    
                    class="font-medium text-6xl text-white"
                  >
                    <span id="forecastTemperature">${(
                      forecastDay.main.temp - 273.15
                    ).toFixed(0)}</span>°
                  </div>
                  <div class="flex flex-col items-center ml-6">
                    <!-- forecast weather -->
                    <div id="forecastWeather" class="text-white">${
                      forecastDay.weather[0].description
                    }</div>
                    <!-- max temperature -->
                    <div class="mt-1">
                      <span class="text-sm font-thin text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-up"></i
                      ></span>
                      <span
                        id="forecastMaxTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${(forecastDay.main.temp_max - 273.15).toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                    <!-- min temperature -->
                    <div>
                      <span class="text-sm text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-down"></i
                      ></span>
                      <span
                        id="forecastMinTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${(forecastDay.main.temp_min - 273.15).toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                  </div>
                </div>
                <!-- forecast weather information -->
                <div class="flex flex-row justify-between mt-6">
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Wind</div>
                    <div id="forecastWind" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.wind.speed}</span>m/s
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Humidity</div>
                    <div id="forecastHumidity" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.main.humidity}</span>%
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Visibility</div>
                    <div id="forecastVisibility" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.visibility / 1000}km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
`;
    }
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }
}
async function fetchCurrentData(position) {
  const lat = position.coords.latitude;
  console.log(lat);
  const lon = position.coords.longitude;
  console.log(lon);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error("City not Found");
    }
    const data = await response.json();
    console.log("weatherData = ", data);

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    current_weather.innerHTML = data.weather[0].main;
    current_temperature.innerHTML = (data.main.temp - 273.15).toFixed(0);
    city.innerHTML = data.name;
    country.innerHTML = data.sys.country;
    temperature.innerHTML = (data.main.temp - 273.15).toFixed(0);
    windSpeed.innerHTML = data.wind.speed;
    humidity.innerHTML = data.main.humidity;
    visibility.innerHTML = data.visibility / 1000;
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }

  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const forecastResponse = await fetch(forecastApiUrl);
    console.log(forecastResponse);
    if (!forecastResponse.ok) {
      throw new Error("City not Found");
    }
    const forecastData = await forecastResponse.json();
    console.log("forecastData = ", forecastData);
    let sixDaysForecast = [];
    let forcastDays = forecastData.list.filter((forecastday) => {
      let forecastDate = new Date(forecastday.dt_txt).getDate();
      if (!sixDaysForecast.includes(forecastDate)) {
        return sixDaysForecast.push(forecastDate);
      }
    });
    console.log(forcastDays);
    forecastCards.innerHTML = "";
    for (let forecastDay of forcastDays) {
      let date = new Date(forecastDay.dt_txt);
      console.log(date);
      console.log(date.getMonth());

      forecastCards.innerHTML += `
<div>
              <div
                class="flex flex-col bg-white/20 backdrop-blur-sm rounded p-4 w-full"
              >
                <!-- forecast day -->
                <div id="forecastDays" class="font-bold text-white text-xl">
                  Thursday
                </div>
                <!-- forecast date -->
                <div id="forecastDate" class="text-sm text-[#a8b9d7]">
                  10 May 2020
                </div>
                <!-- forecast icon -->
                <div
                  class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
                >
                  <img
              class="md:w-40 w-20 h-4w-25"
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
            />
                </div>
                <div class="flex flex-row items-center justify-center mt-6">
                  <!-- forecast temperature -->
                  <div
                    
                    class="font-medium text-6xl text-white"
                  >
                    <span id="forecastTemperature">${(
                      forecastDay.main.temp - 273.15
                    ).toFixed(0)}</span>°
                  </div>
                  <div class="flex flex-col items-center ml-6">
                    <!-- forecast weather -->
                    <div id="forecastWeather" class="text-white">${
                      forecastDay.weather[0].description
                    }</div>
                    <!-- max temperature -->
                    <div class="mt-1">
                      <span class="text-sm font-thin text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-up"></i
                      ></span>
                      <span
                        id="forecastMaxTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${(forecastDay.main.temp_max - 273.15).toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                    <!-- min temperature -->
                    <div>
                      <span class="text-sm text-[#a8b9d7]"
                        ><i class="fa-solid fa-arrow-down"></i
                      ></span>
                      <span
                        id="forecastMinTemp"
                        class="text-sm font-light text-[#a8b9d7]"
                        ><span>${(forecastDay.main.temp_min - 273.15).toFixed(
                          2
                        )}</span>°C</span
                      >
                    </div>
                  </div>
                </div>
                <!-- forecast weather information -->
                <div class="flex flex-row justify-between mt-6">
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Wind</div>
                    <div id="forecastWind" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.wind.speed}</span>m/s
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Humidity</div>
                    <div id="forecastHumidity" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.main.humidity}</span>%
                    </div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="font-medium text-sm text-white">Visibility</div>
                    <div id="forecastVisibility" class="text-sm text-[#a8b9d7]">
                      <span>${forecastDay.visibility / 1000}km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
`;
    }
  } catch (error) {
    console.error("Error while fetching weather data: ", error);
  }
}

searchBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    citySearched.forEach((inp) => {
      const city = inp.value;
      if (city) {
        if (city) {
          const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
          // fetchWeather(inp.value);
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              let { name, lat, lon, country, state } = data[0];
              fetchWeather(name, lat, lon, country, state);
            });
        } else {
          console.log("Please enter a city name");
        }
      }
    });
  });
});

currentBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchCurrentData);
    } else {
      console.log("GeoLocation is not supported");
    }
    // fetchCurrentData();
  });
});

// const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=df77161e8b524dcea26181828240510&q=${citySearched}&days=7`;

// searchBtn.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("There was a problem with the fetch operation:", error);
//       });
//   });
// });

// searchBtn.addEventListener

// async function api() {
//   const response = await fetch(
//     "https://api.weatherapi.com/v1/forecast.json?key=df77161e8b524dcea26181828240510&q=kolkata&days=7"
//   );
//   const result = await response.json();
//   console.log(result);
// }

const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menuIcon");
const menuCloseIcon = document.getElementById("menuCloseIcon");

function menuToggle(e) {
  e.name === "menu"
    ? ((e.name = "close"),
      mobileMenu.classList.remove("hidden"),
      mobileMenu.classList.add("block"))
    : ((e.name = "menu"),
      mobileMenu.classList.add("hidden"),
      mobileMenu.classList.remove("block"));
}
