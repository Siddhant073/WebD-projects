import React, { useEffect, useState } from 'react'
import './CityStyle.css'
import WeatherCard from './WeatherCard';

const City = () => {
  const [searchvalue,setSearchValue] = useState("firozabad");
  const [tempInfo ,setTempInfo] = useState({});
  const [gmtTime, setGmtTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const getCurrentGmtTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
    const interval = setInterval(() => {
      setGmtTime(getCurrentGmtTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addtwotime = (time1, time2) => {
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);
    let totalHours = hours1 + hours2;
    let totalMinutes = minutes1 + minutes2;
    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }
    return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}`;
  }
  const getWeatherInfo = async() =>{
    setSearchValue("")
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=8befdd1b37e8afb219b2d3d9cf68cf35`;
      const res = await fetch(url);
      const data = await res.json();
      const  {temp,pressure,humidity} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country,sunrise,sunset} = data.sys;
      const {timezone} = data;
      const abcd = timezone/3600;
      const floorr = Math.floor(abcd);
      const minutes = (abcd-floorr)*60;
      const time1 = `${floorr}:${minutes}`;
      const myresult = new Date().toLocaleDateString() +" "+ addtwotime(time1,gmtTime);
      const myNewWeather = {
        temp,pressure,humidity,weathermood,name,speed,country,sunrise,sunset,myresult,
      }
      setTempInfo(myNewWeather);
    }
    catch(error){
      console.log(error);
    }
  };
  const world = (event) =>{
    setSearchValue(event.target.value);
  }

  useEffect(() =>{
    getWeatherInfo();
  },[]);

  return (
    <>
      <div className="wrap">
        <div className="search">
            <input  onChange={world} value={searchvalue} placeholder='Search...' autoFocus  type="search"  id="search"  className='searchTerm'/>
            <button type='button' onClick={getWeatherInfo} className='searchButton'>Search</button>
        </div>
      </div>
      <WeatherCard {...tempInfo}/>
    </>
  )
}

export default City
