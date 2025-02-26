import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function MarePage() {
  const [mareData, setMareData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;


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

const fetchTideByCity = (city) => {
  axios.get(`https://weather-app-production-fc08.up.railway.app/api/mare/${city}`)
    .then((response) => {
      console.log('Clima', response.data);
      setMareData(response.data);
    })
    .catch((error) => {
      console.error('Erro ao buscar marés', error);
    });
};


  useEffect(() => {
   if (city) {
     fetchTideByCity(city);
    }
  }
  , [city]);   

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-primary">Voltar</Link>
      <h1 className="text-center my-4">Dados da Maré em {city}</h1>

      {mareData ? (
        <div className="card p-4">
          <h3>Horários e Alturas das Marés</h3>
          {mareData.forecast.forecastday[0].day.tides[0].tide.map((tide, index) => (
            <div key={index} className="border p-2 mb-2">
              <p><strong>Horário:</strong> {tide.tide_time}</p>
              <p><strong>Altura:</strong> {tide.tide_height_mt}m</p>
              <p><strong>Tipo:</strong> {tide.tide_type === "HIGH" ? "Maré Alta" : "Maré Baixa"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Carregando dados...</p>
      )}
    </div>
  );
}

export default MarePage;
