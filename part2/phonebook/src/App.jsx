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
    const names = persons.map(person => person.name)

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {

    const nameObject = {
      id: nextId++,
      name: newName
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    }
  }

  // Event handler for synchronising every change to the input with the newName state
  const handleNameChange = (event) => {
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
      <div>{persons.map(person => <div key={person.id}>{person.name}</div>)}</div>
    </div>
  )
}

export default App