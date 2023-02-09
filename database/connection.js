const mongoose = require('mongoose')

mongoose.set('strictQuery',true)

const connectDB = (url)=>{
  mongoose.connect(url)
          .then(()=>console.log('Connected to the database'))
          .catch((err)=>console.log(err))
}

module.exports = connectDB