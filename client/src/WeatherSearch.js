//src/WeatherSearch.js

import React, { useEffect, useState } from 'react';


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
    <div className='mb-3'>
        <div className='input-group'>
      <input
        type="text"
        className='form-control'
        value={cityInput}
        placeholder='Digite o nome da cidade...'
        onChange={(event) => setCityInput(event.target.value)}
        onKeyDown={handleKeyDown}
     />
        <button class name="btn btn-primary" onClick={handleSearch}>Buscar</button>
        </div>
    </div>
  );
}

export default WeatherSearch;