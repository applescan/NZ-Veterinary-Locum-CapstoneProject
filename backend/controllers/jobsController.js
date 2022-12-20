var getJobsData = require('../services/dbServicesJobs.js') 

const fetchJobs = async (req, res) => {  
    let jobs = await getJobsData.fetchJobs(req, res)
}
const fetchJobsCity = async (req, res) => {  
    let jobs = await getJobsData.fetchJobsCity(req, res)
}
const deleteJobsId = async (req, res) => {  
    let jobs = await getJobsData.deleteJobsId(req, res)
}
const updateJob = async (req, res) => {  
    let jobs = await getJobsData.updateJob(req, res)
}
const addJobs = async (req, res) => {  
    let jobs = await getJobsData.addJobs(req, res)
}

module.exports = {
    fetchJobs,
    fetchJobsCity,
    deleteJobsId,
    updateJob,
    addJobs
}