import { useEffect, useState } from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  //   console.log(data);
  useEffect(() => {
    let tempColor;
    let timeColor;
    if (data.main.temp > 20) {
      tempColor = "#ffaf2f";
    } else {
      tempColor = "#1aaefd";
    }
    if (data.weather[0].icon.includes("d")) {
      timeColor = "#1aeafd";
    } else {
      timeColor = "#000000";
    }
    document.getElementById(
      "weather"
    ).style.backgroundImage = `linear-gradient(to bottom, ${timeColor}, ${tempColor})`;
  }, [data.main.temp]);
  return (
    <div id="weather" className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="city-details">{data.cityDetails}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather-img"
          className="weather-icon"
          src={`newIcons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <div>
          <p className="temperature">{Math.floor(data.main.temp)}°C</p>
          <div className="min-max-temp">
            <p>L:{Math.floor(data.main.temp_min)}</p>
            <p>H:{Math.floor(data.main.temp_max)}</p>
          </div>
        </div>

        <p className="details">
          <div className="parameter-row">
            <span className="parameter-label top">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.floor(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">
              {Math.floor(data.wind.speed)} m/s
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">
              {Math.floor(data.main.humidity)}%
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">
              {Math.floor(data.main.pressure)} hPa
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
