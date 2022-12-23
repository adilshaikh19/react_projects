//https://api.openweathermap.org/data/2.5/weather?q=pune&appid=c23d207d5df16908d6138de54b4201b3

import React,{useEffect, useState} from 'react'
import "./style.css"
import Weathercard from './weathercard';

const Temp = () => {
    const [searchValue , setSeachValue] = useState("pune");
    const [tempInfo , setTempInfo] = useState("")

    const getWeatherInfo = async () =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=c23d207d5df16908d6138de54b4201b3`;

            let res = await fetch(url)
            let data = await res.json();
            
            const {temp, humidity, pressure} = data.main;
            const {main:weather} = data.weather[0]
            const {name} = data;
            const {speed} = data.wind;
            const {country , sunset} = data.sys;
            

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weather,
                name,
                speed,
                country,
                sunset
            }
            setTempInfo(myNewWeatherInfo)

            console.log(data)
        }
        catch(error){
            console.log(error)
        }
    }


    useEffect(() =>{
        getWeatherInfo();
    } ,[])

  return (
    <>
        <div className='wrap'>
            <div className='search'>
                <input type = "search" placeholder='search...' autoFocus id='search' className='searchTerm'
                value={searchValue} onChange={(e) => setSeachValue(e.target.value)}
                ></input> 

                <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>

        <Weathercard tempInfo={tempInfo}/>
        
    </>
  )
}

export default Temp