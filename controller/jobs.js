const Jobs = require('../models/jobsSchema')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors/custom_errors')


const getAllJobs = async (req,res)=>{
  const jobs = await Jobs.find({createdBy:req.user.userId})
  res.status(StatusCodes.OK).json({data:jobs})
}
const getJob = async (req,res)=>{
  try {
    const {user:{userId},params:{id:jobId}} = req

    const job = await Jobs.findOne({
      _id:jobId,
      createdBy:userId
    })
    
    res.status(StatusCodes.OK).json(job)
  } catch (error) {
    throw new NotFoundError('Not found')
  }
}
const createJob = async (req,res)=>{
  req.body.createdBy = req.user.userId
  const job = await Jobs.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
}
const updateJob = async (req,res)=>{
  res.send('update Job')
}
const deleteJob = async (req,res)=>{
  res.send('delete Job')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
