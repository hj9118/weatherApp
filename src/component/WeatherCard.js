import React, { useState } from 'react';

const WeatherCard = ({ weather }) => {
  const [temp, setTemp] = useState(true);

    const changeTemp = () => {
        setTemp(temp => !temp);
    };
  return (
    <div className='weather-card'>
      <div className='card-header'>
        <div>
          <p className='weather-city'>
            {weather ? weather.name + ' ' + weather.sys.country : '-'}
          </p>
          <p className='weather-description'>
            {weather ? weather.weather[0].description : '-'}
          </p>
        </div>
        <img
          alt={'weather'}
          className={'weather-icon'}
          src={`icons/${weather ? weather.weather[0].icon : 'unknown'}.png`}
        />
      </div>
      <div className='card-body'>
        <h2 className='weather-temp' onClick={changeTemp}>
          {weather ? (temp ? Math.round(weather.main?.temp - 273.15) : Math.round((weather.main?.temp -273.15)*9 /5 +32)) : ''}
          {temp == true ? <span>℃</span> : <span>℉</span>}
        </h2>
        <div className='weather-details'>
          <div className='parameters'>
            <span className='param-label'>Details</span>
          </div>
          <div className='parameters'>
            <span className='param-label' >Feels Like:</span>
            <span className='param-val' onClick={changeTemp}>
              {weather ? (temp ? (weather.main?.feels_like - 273.15).toFixed(2) : ((weather.main?.feels_like -273.15)*9 /5 +32).toFixed(2)) : '-'}
              {temp ? <span>℃</span> : <span>℉</span>}
            </span>
          </div>
          <div className='parameters'>
            <span className='param-label'>Humidity: </span>
            <span className='param-val'>
              {weather ? weather.main?.humidity : '-'} %
            </span>
          </div>
          <div className='parameters'>
            <span className='param-label'>Pressure: </span>
            <span className='param-val'>
              {weather ? weather.main?.pressure : '-'} hPs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
