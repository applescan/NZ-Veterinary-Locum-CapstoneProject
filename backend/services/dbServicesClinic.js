const clinicsModels = require('../models/clinicsModels.js');

//all get functions
async function fetchClinics(req, res) {
    const clinics = await clinicsModels.find();
    for (let i = 0; i < clinics.length; i++) {
        console.log(clinics)
    }
    try {
        res.send(clinics);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchClinicsCity(req, res) {
    let address = req.params.address
    const clinics = await clinicsModels.find({address: {$regex: address, $options: 'i'}}) // i for case insensitive
    console.log(clinics)
    try {
        res.send(clinics);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteClinicsId(req, res) {
    try {
        const id = req.params.id;
        const data = await clinicsModels.findByIdAndDelete(id)
        res.send(`${data.business_name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function updateClinic(req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await clinicsModels.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function addClinics(req, res) {
    const clinics = new clinicsModels({
        business_name: req?.body?.business_name,
        specialities: req?.body?.specialities,
        email: req?.body?.email,
        phone: req?.body?.phone,
        password: req?.body?.password,
        address: req?.body?.address,
        hours: req?.body?.hours,
        imageKey: "clinicDefault.jpg"
    })

    try {
        const dataToSave = await clinics.save();
        res.status(200).json(dataToSave)
        console.log(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    fetchClinics,
    fetchClinicsCity,
    deleteClinicsId,
    updateClinic,
    addClinics
}