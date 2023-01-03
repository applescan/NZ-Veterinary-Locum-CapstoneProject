const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    specialities: {
        type: String,
        required: false,
    },
    descriptions: {
        type: String,
        required: false,
    },
    clinic_id: {
        type: String,
        required: true,
    }
});
const jobs = mongoose.model('jobcollections', jobsSchema); //make sure the name for collection to add "s" on mongodb compass and all lowercase
module.exports = jobs;