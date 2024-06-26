import { WiHumidity } from "react-icons/wi";
import { MainWrapper } from "./styles.module.ts";
import { AiOutlineSearch } from "react-icons/ai";
import { SiWindowsxp } from "react-icons/si";
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsCloudFog2Fill } from "react-icons/bs";
// import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";

// Axios
import axios from "axios";
import React from "react";


interface WeatherDataProps {
  name: string;

  main: {
    temp: number;
    humidity: number;
  };

  sys: {
    country: string;
  };

  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(null)


const DisplayWeather = () => {

  // const api_key = process.env.REACT_APP_API_KEY;
  // const api_Endpoint = process.env.REACT_APP_API_ENDPOINT;

  const api_key = "0cc86d16bf572f78cdc96c096c7627e5";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";


  const fetchCurrentWeather = (lat: number, lon: number) => {
    const url = `${api_Endpoint}weahter? lat=${lat}&lon=${lon}&api_id=${api_key}$units=metric`

    async () => {
      const response = await axios.get(url);
      return response.data;
    };

  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);

        })

    })
  })




  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };


  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input type="text" placeholder="enter a city" />

          <div className="searchCircle">
            <AiOutlineSearch className='searchIcon' />
          </div>
        </div>


        {weatherData && (

          <>
            <div className="weatherArea">
              <h1>{weatherData.name}</h1>
              <span>{weatherData.sys.country}</span>
              <div className="icon">
                icon
              </div>
              <h1>{weatherData.main.temp}</h1>
              <h2>{weatherData.weather[0].main}</h2>
            </div>

            <div className="bottomInfoArea">
              <div className="humidityLevel">
                <WiHumidity className="windIcon" />
                <div className="humidInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind">
                <SiWindowsxp className="windIcon" />
                <div className="humidInfo">
                  <h1>{weatherData.wind.speed}km/hr</h1>
                  <p>wind speed</p>
                </div>
              </div>
            </div>
          </>

        )};



      </div>
    </MainWrapper>
  )
}

export default DisplayWeather