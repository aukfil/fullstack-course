const persons = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' }
  ]

const newName = { id: 3, name: 'A' }

const names = persons.map(person => person.name)

console.log(persons)
console.log(names)

if (names.includes(newName.name)) {
    console.log('name already exists')
  } else {
    const newPersons = persons.concat(newName)
    console.log(newPersons)
  }