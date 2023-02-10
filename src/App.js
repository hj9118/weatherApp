import { useRef, useState } from 'react';
import './App.css';
import WeatherCard from './component/WeatherCard';
import { fetchWeather } from './api';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { RxReset } from 'react-icons/rx';
import { MdKeyboardVoice, MdSearch } from 'react-icons/md';

function App() {
  const [record, setRecord] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Browser doesn't support speech recognition.");
  }

  const ref = useRef();

  const ChangeMode = (e) => {
    setRecord((record) => !record);
    e.preventDefault();
  };
  const startRecord = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
    resetTranscript();
  };
  const stopRecord = () => {
    ref.current.focus();
    setCity('');
  };

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  let voice = transcript.slice(0);
  voice = voice.endsWith('.') ? voice.slice(0, -1) : voice;

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
          autoFocus
          type='text'
          placeholder='Enter city'
          value={city}
          ref={ref}
          onChange={handleChange}
        />
        <button type='submit'>
          <MdSearch />
        </button>
        <button
          type='button'
          onClick={record ? startRecord : stopRecord}
          onContextMenu={ChangeMode}
        >
          {record ? <MdKeyboardVoice /> : <RxReset />}
        </button>
        <span className='app_mode'>
          {record ? 'Voice mode' : 'Typing mode'}
        </span>
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
