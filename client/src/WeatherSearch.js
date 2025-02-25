//src/WeatherSearch.js

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function WeatherSearch({onSearch}) {
  const [cityInput, setCityInput] = useState('');
  const handleSearch = () => {
    if (cityInput.trim() !== '') {
      onSearch(cityInput);
      setCityInput('');
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="mb-3 d-flex justify-content-center">
      <div className="input-group" style={{ maxWidth: "600px" }}>
        <input
          type="text"
          className="form-control"
          value={cityInput}
          placeholder="Digite o nome da cidade..."
          onChange={(event) => setCityInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-outline-info" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>

  );
}


export default WeatherSearch;