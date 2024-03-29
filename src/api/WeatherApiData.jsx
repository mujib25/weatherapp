import { useState } from "react"
// import partlyCloud from '../assets/icons/partlycloud.png'
// import clouds from '../assets/icons/clouds.png'
// import clear from '../assets/icons/clear.png'
// import rain from '../assets/icons/rain.png'
// import snow from '../assets/icons/snow.png'
import backClouds from '../assets/images/clouds.webp'
import backClear from '../assets/images/clear.jpg'
import backSnow from '../assets/images/snow.webp'
import backRain from '../assets/images/rain.jpg'


const api = {
  key: "266a54248d06c8540ad5f9b34ec4328f",
  url: "https://api.openweathermap.org/data/2.5/"
  // url:"https://history.openweathermap.org/data/2.5/history/"
}

function WeatherApiData() {

  const [search, setSearch] = useState('Balakot')
  const [weather, setWeather] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [city, setCity] = useState("Enter The City Name")

  function currentDate(start) {
    const myDate = new Date()
    start =(myDate.getDate() + "-" + myDate.getMonth()+1 + "" + "-" + myDate.getFullYear());
    return start
   }
   function previousDate(end) {
    const myDate = new Date()
    myDate.setDate(myDate.getDate() - 7);
    myDate.setMonth(myDate.getMonth()); 
    end = (myDate.getDate() + "-" + myDate.getMonth()+1 + "" + "-" + myDate.getFullYear());
    return end
    }
    
 
  const searchPressed = () => {
     fetch(`${api.url}weather?q=${search}&units=metric&&start=${start}&end=${end}&APPID=${api.key}`)
    // fetch(`${api.url}?q=${search}&start=${start}&end=${end}&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
        setSearch(search)
        setStart(currentDate)
        setEnd(previousDate)
        search!== weather.name ? setCity('City Name Not Found') : city
      })
      
     
  }

  return (
    <>
     <div className="absolute text-center translate-y-24 mx-2 w-full" >
        <div className="py-5">
          <h3 className="font-serif font-extrabold text-2xl uppercase tracking-widest">{weather.name || 'Weather App'}</h3>
        </div>

        {
          typeof weather.main !== "undefined" ? (
            <div className="bg-orange-400 w-80 mx-auto p-5 rounded-lg shadow-2xl mb-3" style={{
              backgroundImage: weather.weather[0]?.main === "Clouds" ? `url(${backClouds})` : 
              weather.weather[0]?.main === "Clear" ? `url(${backClear})` :
              weather.weather[0]?.main === "Snow" ? `url(${backSnow})` : 
              weather.weather[0]?.main === "Rain" ? `url(${backRain})` :
              ''
              , backgroundSize:'cover'
            }}>
              <div className="mb-3">
                <div className="">
                 <h3 className='`${weather.weather[0].main==="Clouds"} ? text-black : text-white` font-bold'> {weather.name} , {weather.sys.country} </h3>
                 <h3 className="text-black"> {end} {start}</h3>

                 <div className="bg-black opacity-75 rounded-md p-2">
                  {/* <img className="mx-auto" src={
                    weather.weather[0].main === "Clouds" ? clouds :
                      weather.weather[0].main === "Clear" ? clear :
                        weather.weather[0].main === "Rain" ? rain :
                          weather.weather[0].main === "Partly Clouds" ? partlyCloud :
                            weather.weather[0].main === "Snow" ? snow : ''
                  } alt="" /> */}
                  <img className="mx-auto" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                

                <h3 className='`${weather.weather[0].main==="Clouds"} ? text-black : text-white ` font-bold'>{weather.main.temp} <sup>o</sup>F</h3>
                <h4 className='`${weather.weather[0].main==="Clouds"} ? text-black : text-white ` font-bold'>{weather.weather[0].main || 'Status'}</h4>
                <h5 className='`${weather.weather[0].main==="Clouds"} ? text-black : text-white ` font-bold'>{weather.weather[0].description || 'Status Detail'}</h5>
                </div>
                </div>
              </div>
            </div>
             
             
      
          ) : (`${city}`)
        }
        <div className="w-80 mx-auto">
        <input className="w-full rounded-md text-black p-2 outline-none shadow-2xl border-[12px solid red]" type="text" onChange={(e) => setSearch(e.target.value)} />
        <div className="button-div">
          <button className="bg-gray-950 w-full rounded-md py-2 my-2 hover:bg-orange-600 ease-in duration-300" onClick={searchPressed}>Search</button>
        </div>
        </div>
      </div>
      
    </>
  )
}

export default WeatherApiData
