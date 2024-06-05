/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getWeather } from "../services/weather";

const Display = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeather(country)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <br />
      <p>
        <b>Languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt={country.flags.alt} />
      <br />
      <h2>Weather in {country.capital}</h2>
      <br />
      {weatherData ? (
        <>
          <p>Temperature: {weatherData.current.temp} °C</p>
          <br />
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
            alt={weatherData.current.weather[0].description}
          />
          <br />
          <p>Wind: {weatherData.current.wind_speed} m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
};

export default Display;
