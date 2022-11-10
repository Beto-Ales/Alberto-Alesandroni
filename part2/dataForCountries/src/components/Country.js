import React from 'react'

const Country = ({ country, languages, weather }) => {    

    return(
        <div>            
            <h1>{country.name.common} </h1>
            <p>Capital {country.capital} </p>
            <p>Population {country.population} </p>
            <h2>Languages</h2>      
            <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>            
            <span>{country.flag}</span>
            <h2>Weather in {country.capital}</h2>
            <ul>
            <li>Temperature {weather.list[0].main.temp} Celcius</li>
            <li>{weather.list[0].weather[0].description}</li>
            <li>Speed {weather.list[0].wind.speed}</li>
            </ul>
            
        </div>
      )
}

export default Country