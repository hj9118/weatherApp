import { useEffect, useState } from 'react';
import './App.css';
import WeatherCard from './component/WeatherCard';
import { fetchWeather } from './api';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { ImSearch } from 'react-icons/im';
import { RiVoiceprintFill } from 'react-icons/ri';
import {RxReset} from 'react-icons/rx'

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Browser doesn't support speech recognition.");
  }
  {SpeechRecognition.startListening({
    continuous: true,
    language: 'en-US',
  })}

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  let voice = transcript.slice(0, -1);
  
  useEffect(() => {
    setCity(voice);
  }, [voice, button])

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
        <button type='submit'>
          <ImSearch />
        </button>
        <button type='button' onClick={() => setCity(' ')}        
        >
          <RxReset />
        </button>
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
