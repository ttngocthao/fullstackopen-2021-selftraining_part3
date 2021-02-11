const express = require('express')
const app = express()

app.use(express.json())


const persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Jane Doe",
      "number": "789456123",
      "id": 6
    }
  ]

app.get('/',(req,res)=>{   
    res.send('<h1>Part 3 Exercise</h1>')
})

app.get('/info',(req,res)=>{
    const personsLength = persons.length
    const reqTime = new Date()
    res.send(`
        <p>Phonebook has info for ${personsLength}</p>
        <p>${reqTime}</p>
    `)
})

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
    const personId = Number(req.params.id)
    //find if this person exist
    const person = persons.find(p=>p.id === personId)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }

})

app.delete('/api/persons/:id',(req,res)=>{
    const personId = Number(req.params.id)
    //find if this person exist
    const person = persons.find(p=>p.id === personId)
    if(person){
        res.status(200).json('Successfully deleted')
    }else{
        res.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})