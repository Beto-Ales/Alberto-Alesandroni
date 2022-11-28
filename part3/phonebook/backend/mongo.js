const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]

const url =`mongodb+srv://beto:${password}@cluster0.otp1c.mongodb.net/Phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
})


const Person = mongoose.model('people', personSchema)

// eslint-disable-next-line no-undef
if (process.argv.length < 4) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

// password: RtBqdLV1TuK7OSJc




// eslint-disable-next-line no-undef
if (process.argv.length > 4) {

  // eslint-disable-next-line no-undef
  const name = process.argv[3]
  // eslint-disable-next-line no-undef
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log(`Added ${name} number ${number}`)
    mongoose.connection.close()   // If the connection is not closed, the program will never finish its execution.
  })
}

