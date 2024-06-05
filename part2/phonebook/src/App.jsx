import { useState } from 'react'

// Initialize the ID counter
let nextId = 2

const App = () => {
  
  // Array to store people's names, initialized with a first name
  const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas'
     }
  ]) 

  // State for storing input submitted by the user - controlling input with state variable
  const [newName, setNewName] = useState('')

  // Event handler for the form submission event (onSubmit)
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: nextId++,
      name: newName
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  // Event handler for synchronising every change to the input with the newName state
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <div key={person.name}>{person.name}</div>)}</div>
    </div>
  )
}

export default App