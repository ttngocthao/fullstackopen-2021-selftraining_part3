const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))//point to frontend html file
app.use(express.json())

app.use(cors())

morgan.token('person',(req,res)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person '))

let persons = [
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

const generateId =()=>{
  return Math.floor(10000*Math.random())
}

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
    const personId = Number(req.params.id)//have to use Number as params.id is a string
    //find if this person exist
    const person = persons.find(p=>p.id === personId)
    if(person){
      persons.filter(p=>p.id !== personId)
      return  res.status(200).json('Successfully deleted')
    }else{
      return  res.status(404).end()
    }
})

app.post('/api/persons',(req,res)=>{
  if(!req.body.name || !req.body.number ){
    return res.status(400).json({
      error: 'Name or number is missing.'
    })  
  }
  if(persons.find(p=>p.name === req.body.name)){
     return res.status(400).json({
      error: 'Name must be unique.'
    })  
  }
  const person = {name: req.body.name,number: req.body.number, id: generateId()}
 
  return res.status(200).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})