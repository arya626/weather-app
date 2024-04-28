import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Firday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInaWeek = new Date().getDay();
  const dates = data.listOfDays;
  const forecastDays = WEEK_DAYS.slice(dayInaWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInaWeek)
  );

  return (
    <>
      <div className="label-box">
        <label className="title"> 5 Daily Forecast</label>
      </div>
      <Accordion allowZeroExpanded>
        {data.listOfDates.map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather-img"
                      className="icon-small"
                      src={`newIcons/${dates[item].icon}.png`}
                    />
                    <label className="day">
                      {forecastDays[idx]}
                      <span className="date">{item}</span>
                    </label>

                    <label className="description">
                      {dates[item].weather_description}
                    </label>
                    <label className="min-max">
                      {Math.round(dates[item].temp_min)}°C /{" "}
                      {Math.round(dates[item].temp_max)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {/* <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure</label>
                    <label>{item.main.pressure} hpa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea Level</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like</label>
                    <label>{Math.round(item.main.feels_like)} °C</label>
                  </div>
                </div>  */}
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
