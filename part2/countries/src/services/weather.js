import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (country) => {
  const APICall = `https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${API_KEY}`;

  return axios.get(APICall).then((response) => response.data);
};

export { getWeather };
