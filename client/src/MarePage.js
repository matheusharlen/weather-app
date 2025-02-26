import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherSearch from './WeatherSearch';
import './App.css'; // Garante que as mesmas classes CSS sejam aplicadas

function MarePage() {
  const [mareData, setMareData] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    axios.get('https://wtfismyip.com/json')
      .then(response => {
        console.log('Localização (IP)', response.data);
        const ipCity = response.data.YourFuckingCity;
        setCity(ipCity);
      })
      .catch(error => {
        console.error('Erro ao buscar localização (IP, marés)', error);
      });
  }, []);

  useEffect(() => {
    if (city) {
      fetchTideByCity(city);
    }
  }, [city]);

  const fetchTideByCity = (city) => {
    axios.get(`https://weather-app-production-fc08.up.railway.app/api/mare/${city}`)
      .then((response) => {
        console.log('Dados da Maré:', response.data);
        setMareData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar marés', error);
      });
  };

  const handleSearchCity = (newCity) => {
    setCity(newCity);
  };

  function formatarDataHora(dataISO) {
    const [data, hora] = dataISO.split(' ');
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora}`;
  }

  return (
    <div className="container py-4">
      <div className="container mare">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/" className="btn btn-info">Voltar</Link>
          <h1 className="text-center mb-0 flex-grow-1">Dados da Maré</h1>
        </div>
      </div>

      <WeatherSearch onSearch={handleSearchCity} />

      {mareData ? (
        <div className="card mx-auto p-4" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h2 className="card-title text-center">{city}</h2>

            <h3 className="mt-4 text-center">Horários e Alturas das Marés</h3>
            <div className="row">
              {mareData.forecast.forecastday[0].day.tides[0].tide.map((tide, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card mb-3 weather-card">
                    <div className="card-body text-center">
                      <h5 className="card-title">{formatarDataHora(tide.tide_time)}</h5>
                      <p className="weather-condition">
                        <strong>Altura:</strong> {tide.tide_height_mt}m
                      </p>
                      <p><strong>Tipo:</strong> {tide.tide_type === "HIGH" ? "Maré Alta" : "Maré Baixa"}</p>
                      <img
                        className="weather-icon"
                        src={tide.tide_type === "HIGH" ? "/mare-alta.png" : "/mare-baixa.png"}
                        alt={tide.tide_type === "HIGH" ? "Maré Alta" : "Maré Baixa"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      ) : (
        <p className="text-center">Carregando dados...</p>
      )}
    </div>
  );
}

export default MarePage;
