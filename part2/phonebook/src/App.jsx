import { useState } from 'react'

// Filter component
const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter shown with <input value = {filter} onChange = {handleFilterChange}/>
  </div>
)

// Form component
const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addName}>
    <div>
      Name: <input value = {newName} onChange = {handleNameChange} />
    </div>
    <div>
      Number: <input value = {newNumber} onChange = {handleNumberChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

// Persons rendering component
const Persons = ({ personsToShow }) => (
  <div>
    {personsToShow.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
  </div>
)

// Initialize the ID counter
let nextId = 5

const App = () => {
  
  // Array to store people's names, initialized with a first name
  const [persons, setPersons] = useState([
    { id: 1, name: 'Alpha', number: '1' },
    { id: 2, name: 'Beta', number: '2' },
    { id: 3, name: 'Gamma', number: '3' },
    { id: 4, name: 'Delta', number: '4' }
  ]) 

  // State for storing input submitted by the user - controlling input with state variable
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Event handler for the form submission event (onSubmit)
  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    
    } else {
      
      const nameObject = {
      id: nextId++,
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    }
  }

  // Event handler for synchronising every change to the input with the newName state
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Filtering the persons to show before rendering the HTML component
  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add new</h3>

      <PersonForm 
        addName={addName}
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App