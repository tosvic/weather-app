import { WiHumidity } from "react-icons/wi";
import { MainWrapper } from "./styles.module.ts";
import { AiOutlineSearch } from "react-icons/ai";
import { SiWindowsxp } from "react-icons/si";
// import { BsFillSunFill, BsCloudyFill, BsFillCloudRainHeavyFill, BsCloudFog2Fill } from "react-icons/bs";
// import { RiLoaderFill } from "react-icons/ri";
// import { TiWeatherPartlySunny } from "react-icons/ti";

// Axios
import axios from "axios";
import React from "react";



const DisplayWeather = () => {

  // const api_key = process.env.REACT_APP_API_KEY;
  // const api_Endpoint = process.env.REACT_APP_API_ENDPOINT;

  const api_key = "0cc86d16bf572f78cdc96c096c7627e5";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";


  const fetchCurrentWeather = (lat:number, lon:number) => {
    const url = `${api_Endpoint}weahter? lat=${lat}&lon=${lon}&api_id=${api_key}$units= metric`;

    const response = await axios.get(url);
    return response.data;

  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
        console.log(currentWeather);

      })

    })
  })


  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input type="text" placeholder="enter a city" />

          <div className="searchCircle">
            <AiOutlineSearch className='searchIcon' />
          </div>
        </div>

        <div className="weatherArea">
          <h1>Lagos</h1>
          <span>lg</span>
          <div className="icon">
            icon
          </div>
          <h1>18c</h1>
          <h2>cloudy</h2>
        </div>

        <div className="bottomInfoArea">
          <div className="humidityLevel">
            <WiHumidity className="windIcon" />
            <div className="humidInfo">
              <h1>60%</h1>
              <p>Humidity</p>
            </div>
          </div>

          <div className="wind">
            <SiWindowsxp className="windIcon" />
            <div className="humidInfo">
              <h1>4.44lkm/hr</h1>
              <p>wind spees</p>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}

export default DisplayWeather