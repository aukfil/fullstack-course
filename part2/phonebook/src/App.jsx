import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/persons'

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
const Persons = ({ personsToShow, deletePerson }) => (
  <div>
    {personsToShow.map(person => 
    <div key={person.id}>
      {person.name} {person.number} <button onClick={() => deletePerson(person.id)}> delete </button>
    </div>)}
  </div>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  
  // Array to store people's names, initialized with a first name
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // State for storing input submitted by the user - controlling input with state variable
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Event handler for the form submission event (onSubmit)
  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {

      if (window.confirm(`${existingPerson.name} already exists. Replace the old number with a new one?`)) {
          const updatePerson = { ...existingPerson, number: newNumber}

          noteService
            .update(existingPerson.id, updatePerson)
            .then(response => {
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
              setNotificationMessage(`Updated ${response.data.name}`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage('Information on has already been removed from the server')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
      }
    
    } else {
      
      const nameObject = {
      name: newName,
      number: newNumber
    }

    noteService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotificationMessage(`Added ${response.data.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }) 
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
      })
    }
  }

  // Event handler for the delete person button event (onClick)
  const deletePerson = (id) => {
    const url = `http://localhost:3001/api/persons/${id}`
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Do you really want to delete ${personToDelete.name}?`)) {

    axios.delete(url)
      .then(response => {
        setPersons(persons.filter(person => person.id !== response.data.id))
      })

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

      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

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

      <Persons 
        personsToShow={personsToShow} 
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App