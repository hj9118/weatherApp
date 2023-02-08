import { useState } from 'react';
import './App.css';
import WeatherCard from './component/WeatherCard';
import { fetchWeather } from './api';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const weather = await fetchWeather(city, setError);
      setWeather(weather);
    } catch (error) {
      setError('City not found');
    }
  };
  return (
    <div className='App'>
      <h1 className='app_heading'>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter city'
          value={city}
          onChange={handleChange}
        />
        <button type='submit'>Search</button>
      </form>

      {error ? (
        <p className='error'>{error}</p>
      ) : (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default App;
