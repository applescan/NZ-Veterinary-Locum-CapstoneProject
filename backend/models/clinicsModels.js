const mongoose = require("mongoose");

const clinicsSchema = new mongoose.Schema({
    business_name: {
        type: String,
        required: true,
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
    address: {
        type: String,
        required: false,
    },
    hours: {
        type: String,
        required: false,
    },
    imageKey: {
        type: String,
        required: true,
    }
});
const clinics = mongoose.model('cliniccollections', clinicsSchema); //make sure the name for collection to add "s" on mongodb compass and all lowercase
module.exports = clinics;