import React from "react"

const Persons = ({ filteredList, handleDelete }) => {
    return(
        <ul>        
            {filteredList.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button> </li>)}
        </ul>
    )
}

export default Persons