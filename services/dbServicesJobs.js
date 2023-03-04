const jobsModels = require('../models/jobsModels.js');

//all get functions
async function fetchJobs(req, res) {
    const jobs = await jobsModels.find();
    for (let i = 0; i < jobs.length; i++) {
        console.log(jobs)
    }
    try {
        res.send(jobs);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchJobsCity(req, res) {
    let location = req.params.location
    const jobs = await jobsModels.find({ location: { $regex: location, $options: 'i' } }) // i for case insensitive
    console.log(jobs)
    try {
        res.send(jobs);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchJobsId(req, res) {
    let jobId = req.params.jobId
    const jobs = await jobsModels.find({ _id: jobId }) // i for case insensitive
    console.log(jobs)
    try {
        return res.send(jobs)
        //res.send(doctors );
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchJobsFromClinicId(req, res) {
    let clinicId = req.params.clinicId
    const jobs = await jobsModels.find({ clinic_id: clinicId }) // i for case insensitive
    console.log(jobs)
    try {
        return res.send(jobs)
        //res.send(doctors );
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteJobsId(req, res) {
    try {
        const id = req.params.id;
        const data = await jobsModels.findByIdAndDelete(id)
        res.send(`${data.job_title} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function deleteClinicId(req, res) {
    try {
        const clinicId = req.params.clinicId;
        const data = await jobsModels.deleteMany({ clinic_id: clinicId })
        res.send(`All jobs belongs to clinic id: ${data.clinic_id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function updateJob(req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await jobsModels.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//post functions for making a new doctor account
async function addJobs(req, res) {

    // Insert the new user data
    let jobs = new jobsModels({
        job_title: req?.body?.job_title,
        email: req?.body?.email,
        phone: req?.body?.phone,
        specialities: req?.body?.specialities,
        location: req?.body?.location,
        descriptions: req?.body?.descriptions,
        clinic_id: req?.body?.clinic_id,
    });
    await jobs.save();
    res.send(jobs);
}


module.exports = {
    fetchJobs,
    fetchJobsCity,
    fetchJobsId,
    fetchJobsFromClinicId,
    deleteClinicId,
    deleteJobsId,
    updateJob,
    addJobs
}