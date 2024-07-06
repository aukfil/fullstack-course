import { useState } from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  <div>
    Fint countries <input value = {filter} onChange = {handleFilterChange}/>
  </div>
}

const App = () => {

  return(
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
    </div>
  )
}

export default App