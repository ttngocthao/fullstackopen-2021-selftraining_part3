
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

const mongoose = require('mongoose')
const databaseUrl =process.env.MONGODB_URL
mongoose.connect(databaseUrl,{useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false,useCreateIndex:true}).then(()=>{
  console.log('Connected to MongoDB')
}).catch(error=>{
  console.log('Error connecting to MongoDB',error)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON',{
    transform:(document,returnedObj)=>{
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person',personSchema)