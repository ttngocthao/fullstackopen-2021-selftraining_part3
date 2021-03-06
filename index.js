require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


//write middleware to handle errors
const errorHandler = (error,req,res,next)=>{
 
  console.error('from errorHandler',error.message)
  if(error.name ==='CastError'){ //MongoDB exception - error was caused by invalid object id
    return res.status(400).send({error:'mal-formatted id'})
  }else if(error.name ==='ValidationError'){
    return res.status(400).send({error: error.message})
  }
  next(error)
}

app.use(express.static('build'))//point to frontend html file
app.use(express.json())
app.use(cors())


morgan.token('person',(req)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person '))




app.get('/',(req,res)=>{   
  res.send('<h1>Part 3 Exercise</h1>')
})

app.get('/api/persons',(req,res)=>{
  Person.find({}).then(returnedList=>{
    return res.status(200).json(returnedList)
  })
})


app.get('/api/persons/:id',(req,res,next)=>{      
  Person.findById(req.params.id)
    .then(person=>{     
      if(person){
        return res.status(200).json(person)   
      }else{
        console.log('could not find that person')
        res.status(404).end()
      }     
          
    })
    .catch(err=>next(err))
})

app.delete('/api/persons/:id',(req,res,next)=>{
  Person.findByIdAndRemove(req.params.id)
    .then(result=>res.status(204).json({...result,msg:'Successfully deleted'}))
    .catch(error=>next(error))
    
})

app.post('/api/persons',(req,res,next)=>{
  const personName = req.body.name
  const personNumber = req.body.number
  
  const person = new Person({
    name:personName,
    number: personNumber
  })

 
  person.save()
    .then(newPerson=> res.status(200).json(newPerson))
    .catch(err=> next(err))
    
})

app.put('/api/persons/:id',(req,res,next)=>{   
  const opts = { runValidators: true, new: true }//{new:true} --> to return a new modified document. without that, it will return the original document.
  Person.findByIdAndUpdate(req.params.id,{number: req.body.number},opts)
    .then((updatedPerson)=>res.status(200).json({msg:'updated item',name:updatedPerson._doc.name,number: updatedPerson._doc.number}))
    .catch(error=> next(error))
})

app.use(errorHandler)//tell the app to use the errorHandler middleware for invalid id
const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})