import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => (
    <div>
      Find countries <input value = {filter} onChange = {handleFilterChange}/>
    </div>
)

const Weather = ({ country, lat, lon }) =>{
  const [temperature, setTemperature] = useState('')
  const api_key = import.meta.env.VITE_API_KEY
  
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    .then(response => {
      setTemperature(response.data.main.temp)
    })
  })

  return(
    <div>
      <h3>Weather in {country}</h3>
      <p>Temperature: {temperature} C</p>
    </div>
  )
}

// Countries rendering component
const Countries = ({ countriesToShow, setFilter }) => {
  if (countriesToShow.length > 10) {
    return(<div>Too many matches, specify another filter </div>)
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0]
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <Weather country={country.name.common} lat={country.latlng[0]} lon={country.latlng[1]}/>
      </div>
    )
  } else { 
    return(
      <div>
        {countriesToShow.map(country =>
          <div key={country.cca3}>
            {country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button>
          </div>
        )}
      </div>
  )}
}

const App = () => {

  // Array to store the countries
  const [countries, setCountries] = useState([])

  // Import countries from a remote server into 'countries' array
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const [filter, setFilter] = useState('')

  // Event handler for synchronising changes to the input with 'filter' state
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Filtering countries to show before rendering the HTML component
  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  return(
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} setFilter={setFilter}/>
    </div>
  )
}

export default App