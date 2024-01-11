import { useState } from "react"
import partlyCloud from '../assets/icons/partlycloud.png'
import clouds from '../assets/icons/clouds.png'
import clear from '../assets/icons/clear.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'

const api = {
  key: "c17e5fb23fca9740b13943342b34aef5",
  url: "https://api.openweathermap.org/data/2.5/"
}

function WeatherApiData() {

  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState("")
  const [city, setCity] = useState("Enter The City Name")

  const searchPressed = () => {
    fetch(`${api.url}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      })
      {search!== weather.name ? setCity('City Name Not Found!') : ""}
      
  }

  return (
    <>
      <div className="absolute text-center translate-y-24">
        <div className="py-5">
          <h3 className="font-serif font-extrabold text-2xl uppercase">Weather App</h3>
        </div>

        {
          typeof weather.main !== "undefined" ? (
            <div className="bg-orange-400 w-96 p-5 rounded-lg shadow-2xl mb-3">
              <div className="mb-3">
                <div className="">
                  {weather.name}
                  <img className="mx-auto" src={
                    weather.weather[0].main === "Clouds" ? clouds :
                      weather.weather[0].main === "Clear" ? clear :
                        weather.weather[0].main === "Rain" ? rain :
                          weather.weather[0].main === "Partly Clouds" ? partlyCloud :
                            weather.weather[0].main === "Snow" ? snow : ''
                  } alt="" />
                </div>
                <h3>{weather.main.temp} <sup>o</sup>F</h3>
                <h4>{weather.weather[0].main || 'Status'}</h4>
                <h5>{weather.weather[0].description || 'Status Detail'}</h5>
              </div>
            </div>
          ) : (`${city}`)
        }
        <input className="w-full rounded-md text-black p-2 outline-none shadow-2xl border-[12px solid red]" type="text" onChange={(e) => setSearch(e.target.value)} />
        <div className="button-div">
          <button className="bg-gray-950 w-full rounded-md py-2 my-2" onClick={searchPressed}>Search</button>
        </div>

      </div>
    </>
  )
}

export default WeatherApiData
