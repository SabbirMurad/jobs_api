const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}=require('../controller/jobs')

const express = require('express')

const router = express.Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router