const Users = require('../models/userSchema')
const { StatusCodes } = require('http-status-codes')
const {
  BadRequestError,
  UnauthenticatedError
} = require('../errors/custom_errors')

const register = async (req,res)=>{
  const user = await Users.create(req.body)
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({token})
}

const login = async (req,res)=>{
  const {email, password} = req.body;

  if(!email || !password){
    throw new BadRequestError('Please provide email and password');
  }

  const user = await Users.findOne({email})

  if(!user){
    throw new UnauthenticatedError('Email not found')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Incorrect password')
  }
  
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user: {name: user.name},token})
}

module.exports = {
  register,
  login
}