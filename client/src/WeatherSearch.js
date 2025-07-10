
//src/WeatherSearch.js

import React from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const WeatherSearch = ({ onSearch }) => {
  const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 3) {
      callback([]);
      return;
    }

    axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}`)
      .then(response => {
        const cities = response.data.results.map(city => ({
          value: city.name,
          label: `${city.name}, ${city.admin1}, ${city.country}`
        }));
        callback(cities);
      })
      .catch(error => {
        console.error('Erro ao buscar cidades:', error);
        callback([]);
      });
  };

  const handleChange = selectedOption => {
    if (selectedOption) {
      onSearch(selectedOption.value);
    }
  };

  return (
    <div className="mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleChange}
        placeholder="Digite o nome da cidade..."
      />
    </div>
  );
};

export default WeatherSearch;