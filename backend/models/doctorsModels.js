const mongoose = require("mongoose");

const doctorsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    specialities: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: false,
    },
    license: {
        type: String,
        required: false,
    },
    availability: {
        type: String,
        required: false,
    },
    work_requirement: {
        type: String,
        required: false,
    },
    imageKey: {
        type: String,
        required: false,
    }
});
const doctors = mongoose.model('doctorcollections', doctorsSchema); //make sure the name for collection to add "s" on mongodb compass and all lowercase
module.exports = doctors;