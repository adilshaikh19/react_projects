import React, { useEffect, useState } from 'react'

const Weathercard = ({tempInfo}) => {
    
    const [weatherState , setWeatherState] = useState("");

    const {
        temp,
        humidity,
        pressure,
        weather,
        name,
        speed,
        country,
        sunset
    } = tempInfo

    let sec = sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}`


    useEffect(() => {
        if(weather){
            switch(weather){
                case "Clouds" : setWeatherState("wi-day-cloudy")
                break;

                case "Haze" : setWeatherState("wi-fog")
                break;

                case "Clear" : setWeatherState("wi-day-sunny")
                break;

                case "Rain" : setWeatherState("wi-day-rain")
                break;

                case "Smoke" : setWeatherState("wi-fog")
                break;

                case "Mist" : setWeatherState("wi-fog")
                break;

                default:
                    setWeatherState("wi-day-sunny")
                    break;
             }
        }
    }, [weather])

  return (
    <>
        <article className='widget'>
            <div className='weatherIcon'>
                <i className={`wi ${weatherState}`}></i>
            </div>

            <div className='weatherInfo'>
                <div className='temperature'>
                    <span>{temp}&deg;</span>
                </div>

                <div className='description'>
                    <div className='weatherCondtition'>{weather}</div>
                    <div className='place'>{name}, {country}</div>
                </div>
            </div>

            <div className='date'>{new Date().toLocaleString()}</div>

            {/* 4 column section */}

            <div className='extra-temp'>
                <div className='temp-info-minmax'>
                    <div className='two-sided-section'>
                        <p>
                            <i className={"wi wi-sunset"}></i>
                        </p>
                        <p className='extra-info-leftside'>
                            {timeStr} PM <br />
                            Sunset
                        </p>
                    </div>

                    <div className='two-sided-section'>
                        <p>
                            <i className={"wi wi-humidity"}></i>
                        </p>
                        <p className='extra-info-leftside'>
                            {humidity} <br />
                            Humidity
                        </p>
                    </div>
                </div>


                <div className='weather-extra-info'>
                    <div className='two-sided-section'>
                        <p>
                            <i className={"wi wi-rain"}></i>
                        </p>
                        <p className='extra-info-leftside'>
                            {pressure} <br />
                            Pressure
                        </p>
                    </div>

                    <div className='two-sided-section'>
                        <p>
                            <i className={"wi wi-strong-wind"}></i>
                        </p>
                        <p className='extra-info-leftside'>
                            {speed} <br />
                            Wind
                        </p>
                    </div>
                </div>
            </div>

        </article>
    
    </>
  )
}

export default Weathercard