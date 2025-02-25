//src/App.js

import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import WeatherSearch from './WeatherSearch';
import 'bootstrap/dist/css/bootstrap.min.css';



import './App.css';

function App() {
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const [weather, setWeather] = useState(null);
const [city, setCity] = useState('');

useEffect(() => {
 axios.get(`https://wtfismyip.com/json`)
  .then((response) => {
    console.log('Localização (IP)', response.data);

    const ipCity = response.data.YourFuckingCity;
    setCity(ipCity);
    
  })
  .catch((error) => {
    console.error('Erro ao buscar localização (IP)', error);
  });
}
, []);
useEffect(() => {
  if (city) {
    fetchWeatherByCity(city);
  }
}
, [city]);

const fetchWeatherByCity = (city) => {
  axios.get(`https://weather-app-production-fc08.up.railway.app/api/weather/${city}`)
    .then((response) => {
      console.log('Clima', response.data);
      setWeather(response.data);
    })
    .catch((error) => {
      console.error('Erro ao buscar clima', error);
    });
};
const handleSearchCity = (newCity) => {
  setCity(newCity);
};  



  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Previsão do Tempo</h1>
      <WeatherSearch onSearch={handleSearchCity} />

      {weather ? (
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h2 className="card-title text-center">
              {weather.location.name}, {weather.location.region},{' '}
              {weather.location.country}
            </h2>

            <div className="d-flex justify-content-around my-3">
              <div>
                <p className="mb-1">Temperatura:</p>
                <h4>{weather.current.temp_c}°C</h4>
              </div>
              <div>
                <p className="mb-1">Vento:</p>
                <h4>{weather.current.wind_kph} km/h</h4>
              </div>
              <div>
                <p className="mb-1">Umidade:</p>
                <h4>{weather.current.humidity}%</h4>
              </div>
            </div>

            <div className="text-center">
              <p>Índice UV: {weather.current.uv}</p>
              <p>Condição: {weather.current.condition.text}</p>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
            </div>

            <div className="text-center mt-3">
              <p>Pressão: {weather.current.pressure_mb} hPa</p>
              <p>Visibilidade: {weather.current.vis_km} km</p>
              <p>
                Nascer do Sol: {weather.forecast.forecastday[0].astro.sunrise}
              </p>
              <p>
                Pôr do Sol: {weather.forecast.forecastday[0].astro.sunset}
              </p>
            </div>

            <h3 className="mt-4">Previsão de 3 Dias</h3>
            <div className="row">
              {weather.forecast &&
                weather.forecast.forecastday.map((day) => (
                  <div className="col-md-4" key={day.date}>
                    <div className="card mb-3">
                      <div className="card-body text-center">
                        <h5 className="card-title">{day.date}</h5>
                        <p>{day.day.condition.text}</p>
                        <p>
                          Max: {day.day.maxtemp_c}°C | Min:{' '}
                          {day.day.mintemp_c}°C
                        </p>
                        <img
                          src={day.day.condition.icon}
                          alt="Ícone condição"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Carregando...</p>
      )}
    </div>
  );
}
export default App;
