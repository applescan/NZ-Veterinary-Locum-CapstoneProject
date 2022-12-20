const doctorsModels = require('../models/doctorsModels.js');


// all get functions
async function fetchDoctors(req, res) {
    const doctors = await doctorsModels.find();
    for (let i = 0; i < doctors.length; i++) {
        console.log(doctors)
    }
    try {
        res.send(doctors);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchDoctorsCity(req, res) {
    let city = req.params.city
    const doctors = await doctorsModels.find({city: {$regex: city, $options: 'i'}}) // i for case insensitive
    console.log(doctors)
    try {
        res.send(doctors);
    } catch (error) {
        res.status(500).send(error);
    }
}

//delete functions
async function deleteDoctorsId(req, res) {
    try {
        const id = req.params.id;
        const data = await doctorsModels.findByIdAndDelete(id)
        res.send(`${data.first_name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

///put functions
async function updateDoctor(req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await doctorsModels.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//post functions
async function addDoctor(req, res) {
    console.log(req.body)
    const doctors = new doctorsModels({
        first_name: req?.body?.first_name,
        last_name: req?.body?.last_name,
        specialities: req?.body?.specialities,
        email: req?.body?.email,
        phone: req?.body?.phone,
        password: req?.body?.password,
        city: req?.body?.city,
        license: req?.body?.license,
        availability: req?.body?.availability,
        work_requirement: req?.body?.work_requirement,
        imageKey: "default.jpg"
    })

    try {
        const dataToSave = await doctors.save();
        res.status(200).json(dataToSave)
        console.log(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    fetchDoctors,
    fetchDoctorsCity,
    deleteDoctorsId,
    updateDoctor,
    addDoctor
}