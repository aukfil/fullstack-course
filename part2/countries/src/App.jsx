import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => (
    <div>
      Find countries <input value = {filter} onChange = {handleFilterChange}/>
    </div>
)

// Countries rendering component
const Countries = ({ countriesToShow }) => (
  <div>
    {countriesToShow.map(country =>
      <div key={country.cca3}>
        {country.name.common}
      </div>
    )}
  </div>
)

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
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App