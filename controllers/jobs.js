const jobBD = require('../models/Job')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async(req, res) => {
    const jobs = await jobBD.find({createdBy : req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, number: jobs.length})
}
const getSingleJob = async(req, res) => {
    const {user: {userId}, params:{id:jobId}}= req;

    const job = await jobBD.findOne({createdBy:userId, _id: jobId})
    if (!job ) {
        throw new NotFoundError(`job${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({job})
}
const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId
    const job = await jobBD.create(req.body)
    res.status(StatusCodes.CREATED).json({ job})
}
const updateJob = async(req, res) => {
    const {user: {userId}, params:{id:jobId}, body:{company, position}}= req;
    
    if(company == "" || position == ""){
        throw new BadRequestError("not found")
    }
    const job = await jobBD.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body, {new:true, runValidators: true})
    if (!job ) {
        throw new NotFoundError(`job${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async(req, res) => {
    const {user: {userId}, params:{id:jobId}}= req;
    const job = await jobBD.findByIdAndRemove({_id: jobId, createdBy: userId})
    if (!job) {
        throw new NotFoundError(`job${jobId} not found`)
    }
    
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
}