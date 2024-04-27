import Search from "./components/search/search";
import CurrentWeather from "./components/currentWeather/current-weather";
import Forecast from "./components/forecast/forecast";
import "./App.css";
import { CURRENT_WEATHER_API, WEATHER_API_KEY } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const [city, region, country] = searchData.label.split(",");
    const cityDetails = `${region}, ${country}`;

    const currentWeatherFetch = fetch(
      `${CURRENT_WEATHER_API}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastWeatherFetch = fetch(
      `${CURRENT_WEATHER_API}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastWeatherResponse = await response[1].json();

        setCurrentWeather({
          city: city,
          cityDetails: cityDetails,
          ...weatherResponse,
        });
        setForecastWeather({
          city: city,
          cityDetails: cityDetails,
          ...forecastWeatherResponse,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
