const mongoose = require('mongoose')


/* example of process.argv
$ node process-args.js <password> firstArg secondArg
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: password
3: firstArg
4: secondArg
 */
if(process.argv.length <3){
    console.log('Please provide the password as an argument with this command line: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://thaotruong:${password}@ttnt-cluster.fmytw.mongodb.net/test?retryWrites=true`
const personName = process.argv[3]
const personNumber = process.argv[4]

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology:false, useFindAndModify:false,useCreateIndex:true}).then(res=>{
    console.log('connected to mongoDB')
}).catch(err=>{
    console.log('error in connecting to mongoDb',err)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person',personSchema)

//create a new person
const person = new Person({
    name:personName,
    number: personNumber
})
//save to database
person.save().then(res=>{
    console.log('save new person')
    mongoose.connection.close()//If the connection is not closed, the program will never finish its execution.
})

//Fetch data from database
// Person.find({}).then(res=>{
//     console.log('list of people',res)
//     mongoose.connection.close()
// })
