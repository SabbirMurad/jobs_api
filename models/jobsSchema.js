const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
  company:{
    type:String,
    required:[true,'Please provide company'],
    maxlength:30
  },
  position:{
    type:String,
    required:[true,'Please provide position'],
    maxlength:50
  },
  status:{
    type:String,
    enum:['interview','declined','pending'],
    default:'pending'
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'Users',
    required:[true,'Please provide user']
  }
})

module.exports = mongoose.model('Jobs',jobsSchema)