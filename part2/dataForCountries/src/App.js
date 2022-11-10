import React, {useState, useEffect} from "react"
import axios from "axios"
import CountriesList from "./components/CountriesList"
import Country from "./components/Country"

const App = () => {
  const [country, setCountry] = useState([])
  const [countryName, setCountryName] = useState('')
  const [filteredList, setFilteredList] = useState([])
  const [languages, setLanguages] = useState([])
  const [weather, setWeather] = useState([])
  const [city, setCity] = useState('london')

  const api_key = process.env.REACT_APP_API_KEY
  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)        
      })    
  }, [])

  useEffect(() => {
    axios            
        .get(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${api_key}`)
        .then(response => setWeather(response.data))
}, [city])

  const handleNameChange = (event) => {

    setCountryName(event.target.value)

    const filter = event.target.value.toLocaleLowerCase()    

    const listToShow = country.filter(country => country.name.common.toLocaleLowerCase().indexOf(filter) > -1)    // from the country list, filter to get the countries that match the search    

    setFilteredList(listToShow)

    listToShow.length === 1 && setLanguages(Object.values(listToShow[0].languages))
    listToShow.length === 1 && setCity(listToShow[0].capital)
  }


  
  if (filteredList.length > 9) {
    return(<div>
      <div>Find Countries: <input value={countryName} onChange={handleNameChange} /></div>
      <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if (filteredList.length === 1) {
    return(
      <div>
        <div>Find Countries: <input value={countryName} onChange={handleNameChange} /></div>        
        <Country country={filteredList[0]} languages={languages} weather={weather} />        
      </div>
    )
  }
  return (
    <div>
      <div>Find Countries: <input value={countryName} onChange={handleNameChange} /></div>
      <ul>        
        {filteredList.map(item => <CountriesList key={item.name.common} country={item} />)}
      </ul>
    </div>
  )  
}

export default App