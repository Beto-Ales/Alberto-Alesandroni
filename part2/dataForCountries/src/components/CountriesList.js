import React, { useState } from 'react'

const CountriesList = ({ country }) => {
    
    const [showMore, setShowMore] = useState(false)

    const label = showMore ? 'Show less' : 'Show more'

    const languages = Object.values(country.languages)

    const toggleMoreContent = () => {
        setShowMore(!showMore)
    }

    if(showMore){
        return(
            <ul>
                <button onClick={toggleMoreContent}>{label}</button>
                <h1>{country.name.common} </h1>
                <p>Capital {country.capital} </p>
                <p>Population {country.population} </p>
                <h2>Languages</h2>      
                <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>
                <span>{country.flag} </span>      
            </ul>
            
        )
    }

    return (
        <li>{country.name.common} <button onClick={toggleMoreContent}>Show more</button> </li>
    )
}

export default CountriesList