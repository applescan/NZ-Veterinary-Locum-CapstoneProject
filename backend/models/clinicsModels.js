const mongoose = require("mongoose");

const clinicsSchema = new mongoose.Schema({
    business_name: {
        type: String,
        required: false,
    },
    specialities: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
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