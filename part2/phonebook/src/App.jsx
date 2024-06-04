import { useState } from 'react'

const App = () => {
  
  // Array to store people's names, initializen with a first name
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  // Event handler for the form submission event (onSubmit)
  const addName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App