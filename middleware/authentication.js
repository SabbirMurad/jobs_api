const Users = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const{
  UnauthenticatedError
} = require('../errors/custom_errors')

const auth = (req,res,next) =>{
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnauthenticatedError('Not Authorized to Access This Route')
  }

  const token = authHeader.split(' ')[1]

  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userId:payload.userId}
    next()
  }
  catch(errors){
    throw new UnauthenticatedError('Not Authorized to Access This Route')
  }
}

module.exports = auth