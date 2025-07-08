
//src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSearch from './WeatherSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Skeleton from './Skeleton';

import './App.css';

function App() {
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

  const fetchWeatherByCity = (selectedCity) => {
    setWeather(null);
    axios.get(`https://weather-app-production-fc08.up.railway.app/api/weather/${selectedCity}`)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar clima', error);
      });
  };

  const handleSearchCity = (newCity) => {
    setCity(newCity);
  };

  function formatarData(dataISO) {
    const data = new Date(dataISO + 'T00:00:00');
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(data);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-4">Previsão do Tempo</h1>
          <WeatherSearch onSearch={handleSearchCity} />

          {weather ? (
            <div className="card mx-auto mt-4">
              <div className="card-body p-4">
                <div className="text-center">
                  <h2 className="card-title">
                    {weather.location.name}, {weather.location.country}
                  </h2>
                  <p className="lead">{weather.current.condition.text}</p>
                </div>

                <div className="d-flex align-items-center justify-content-center my-4">
                  <img
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <h3 className="display-4 fw-bold ms-3">{Math.round(weather.current.temp_c)}°C</h3>
                </div>

                <div className="d-flex justify-content-around text-center border-top pt-3">
                  <div>
                    <p className="mb-1 small">Vento</p>
                    <h5 className="fw-bold">{weather.current.wind_kph} km/h</h5>
                  </div>
                  <div>
                    <p className="mb-1 small">Umidade</p>
                    <h5 className="fw-bold">{weather.current.humidity}%</h5>
                  </div>
                  <div>
                    <p className="mb-1 small">Índice UV</p>
                    <h5 className="fw-bold">{weather.current.uv}</h5>
                  </div>
                </div>

                <h4 className="text-center mt-5 mb-3">Próximos 3 Dias</h4>
                <div className="row">
                  {weather.forecast?.forecastday.map((day) => (
                    <div className="col-4" key={day.date}>
                      <div className="text-center">
                        <p className="fw-bold mb-1">{formatarData(day.date)}</p>
                        <img className="weather-icon my-1" src={day.day.condition.icon} alt="Ícone condição" />
                        <p className="mb-0">
                          <span className="fw-bold">{Math.round(day.day.maxtemp_c)}°</span> / 
                          <span> {Math.round(day.day.mintemp_c)}°</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='mt-4'>
              <Skeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
