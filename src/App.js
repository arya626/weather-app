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
    const forecastWeatherFetch = fetch(
      `${CURRENT_WEATHER_API}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const currentWeatherFetch = fetch(
      `${CURRENT_WEATHER_API}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([forecastWeatherFetch, currentWeatherFetch])
      .then(async (response) => {
        const forecastWeatherResponse = await response[0].json();
        const weatherResponse = await response[1].json();
        const groupedData = forecastWeatherResponse.list.reduce(
          (acc, current) => {
            const date = current.dt_txt.split(" ")[0];
            if (!acc[date]) {
              acc[date] = {
                temp_min: current.main.temp_min,
                temp_max: current.main.temp_max,
                weather_description: current.weather[0].description,
                icon: current.weather[0].icon.slice(0, 2),
              };
            } else {
              if (current.main.temp_min < acc[date].temp_min) {
                acc[date].temp_min = current.main.temp_min;
              }
              if (current.main.temp_max > acc[date].temp_max) {
                acc[date].temp_max = current.main.temp_max;
              }
              acc[date].weather_description = current.weather[0].description;
            }
            return acc;
          },
          {}
        );
        const listOfDates = Object.keys(groupedData);
        setCurrentWeather({
          city: city,
          cityDetails: cityDetails,
          ...weatherResponse,
        });
        setForecastWeather({
          city: city,
          cityDetails: cityDetails,
          listOfDays: groupedData,
          listOfDates: listOfDates,
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
