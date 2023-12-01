import React, { useEffect } from "react";

const WeatherCard = ({
  temp,
  humidity,
  pressure,
  weathermood,
  name,
  speed,
  country,
  sunrise,
  sunset,
  myresult,
}) => {

  const [weatherState, setWeatheState] = React.useState("");
  
  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatheState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [weathermood]);

  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;
  let ml = sunrise;
  let np = new Date(ml*100);
  let timerise = `${np.getHours()}:${np.getMinutes()}`;
  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>

        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;</span>
          </div>

          <div className="description">
            <div className="weatherCondition">{weathermood}</div>
            <div className="place">{name}, {country}</div>
          </div>
        </div>
        <div id="prajauljain" className="date">{myresult}</div>
        {/* hiii */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p><i className={"wi wi-sunrise"}></i></p>
              <p className="extra-info-leftside">{timerise} AM <br />Sunrise</p>
            </div>
            <div className="two-sided-section">
              <p><i className={"wi wi-sunset"}></i></p>
              <p className="extra-info-leftside">{timeStr} PM <br />Sunset</p>
            </div>
          </div>
          <div className="weather-extra-info">
          <div className="two-sided-section">
              <p><i className={"wi wi-humidity"}></i></p>
              <p className="extra-info-leftside">{humidity} <br />Humidity</p>
            </div>
            <div className="two-sided-section">
              <p><i className={"wi wi-strong-wind"}></i></p>
              <p className="extra-info-leftside">{speed} <br />Speed</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default WeatherCard;