import React, { useState, useEffect } from 'react'
import personService from './services/person'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])   
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredList, setFilteredList] = useState(persons)
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')

  useEffect(() => {

    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])  
  
  const addPersons = (event) => {

    event.preventDefault()    

    const personsObject = {
      name: newName,
      number: newNumber
    }

    let exist = false

    persons.forEach((person) => {
      if(
        JSON.stringify(person.name.toLocaleLowerCase()) === JSON.stringify(personsObject.name.toLocaleLowerCase())
        ) {

            exist = true

            const update = window.confirm(`${person.name} is already added to phonebook, replace the old number with the new one?`)

            if(update){

              const id = person.id

              const changedPeron = {...person, number: personsObject.number}

              personService
                .update(person.id, changedPeron)
                .then(updatedPerson => {
                  setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
                  setFilteredList(filteredList.map(person => person.id !== id ? person : updatedPerson))
                  setNewName('')
                  setNewNumber('')
                  setInfoMessage(`Updated ${person.name}`)
                  setTimeout(() => {
                    setInfoMessage(null)
                  }, 5000)
                })
                .catch(error => {
                  setErrorMessage(`Information of ${person.name} has already been removed from the server`)
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                })
            }

            return
          }
    })

    if(exist){return}

    personService
      .create(personsObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setFilteredList(filteredList.concat(returnedPerson))
        setInfoMessage(`Added ${personsObject.name}`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })    
  }
  
  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {

    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {

    const filter = event.target.value.toLocaleLowerCase()
    
    const listToShow = persons.filter(person => person.name.toLocaleLowerCase().indexOf(filter) > -1)

    setFilteredList(listToShow)    
  }

  const handleDelete = id => {

    let confimed = window.confirm('Confirm Delete')

    if(confimed){
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setFilteredList(filteredList.filter(person => person.id !== id))
      setInfoMessage(`Deleted`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
    return    
  }

  return (
    <div>
      <Notification message={errorMessage ? errorMessage : infoMessage} type={errorMessage ? true : false} />
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add New</h3>      
      <PersonForm addPersons={addPersons} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>      
      <Persons filteredList={filteredList} handleDelete={handleDelete} />
    </div>
  )
}

export default App