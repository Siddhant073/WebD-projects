import logo from './logo.svg';
import './App.css';
import City from './WeatherApp/City';
import { useEffect } from 'react';

const App = () =>{

  useEffect(() =>{
    document.title= "Weather App";
  })

  return (
    <>
      <City /> 
    </>
  )
}

export default App;
