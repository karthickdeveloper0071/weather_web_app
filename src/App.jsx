
import './App.css'
import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudyIcon from './assets/cloud.png';
import drizleIcon from './assets/drizzle.jpg';
import rainIcon from './assets/rain.png';
import humidityIcon from './assets/humitity.png';
import snowIcon from './assets/snow.jpg';
import windIcon from './assets/wind.png';
import { useEffect, useState } from 'react';


const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{
 return(
  <>
  <div className="imgae">
    <img src={icon} alt=" image" />
  </div>
  <div className="temp">{temp} °C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="datacontianer">
    <div className="element">
      <img src={humidityIcon} alt=""  style={{height:30}} className='icon'/>
      <div className="data">
        <div className="humidity-persentage">{humidity}%</div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt=""  style={{height:30}} className='icon'/>
      <div className="data">
        <div className="wind-persentage">{wind}km/hr</div>
        <div className="text">Wind Speed</div>
      </div>
    </div>
  </div>
  </>
 )
}


function App() {
  let api_key="fe136800e335c2a469dfe81520e652d8"
  const[text,setText]=useState("chennai")
const [icon,setIcon]=useState(snowIcon)
const [temp,setTemp]=useState(0)
const [city,setCity]=useState("Chennai")
const [country,setCountry]=useState("India")
const [lat,setLat]=useState("0")
const [log,setLog]=useState("0")
const [humidity,setHumidity]=useState("0")
const [wind,setWind]=useState("0")
const [cityNotFound,setCityNotFound]=useState(false)
const [loading,setLoading]=useState(false)

const weathreIconMap={
  "01d":clearIcon,
  "01n":clearIcon,
  "02d":clearIcon,
  "02n":cloudyIcon,
  "03d":drizleIcon,
  "03n":drizleIcon,
  "04d":drizleIcon,
  "04n":drizleIcon,
  "09d":rainIcon,
  "09n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,



}


const search=async()=>{
  setLoading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  try {
    
    let res =await fetch(url)
    let data=await res.json();
   if(data.cod==="404"){
    console.error("City Not Found")
    setCityNotFound(true);
    setLoading(false)
    return;
   }
   setHumidity(data.main.humidity)
   setWind(data.wind.speed)
   setTemp(Math.floor(data.main.temp))
   setCity(data.name)
   setCountry(data.sys.country)
   setLat(data.coord.lat)
   setLog(data.coord.lon)
   const weatherIconCode=data.weather[0].icon;
   setIcon(weathreIconMap[weatherIconCode]||clearIcon)
   
  } catch (error) {
    console.error("An error occurred",error.message)
    
  }
  finally{
    setLoading(false)

  }
};
const handleCity=(e)=>{
  setText(e.target.value)

}
const handleKeyDown=(e)=>{
  if(e.key=="Enter"){
    search()
  }
}
useEffect(()=>{
  search()

},[])



  return (
    <>
      <div className="container">
        <div className="input_contianer">
          <input type="text" className='cityinput' placeholder='Search City' onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}/>
          <div className="Search-icon">
            <img src={searchIcon} alt=""  style={{height:20}}  onClick={()=>{
              search();
            }}/>
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>

        <p className="copyright">
        Designed by <span>K.Karthick</span>
      </p>
      </div>
     
    </>
  )
}

export default App
