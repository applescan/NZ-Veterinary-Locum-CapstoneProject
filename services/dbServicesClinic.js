const clinicsModels = require('../models/clinicsModels.js');
const bcrypt = require('bcryptjs');

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

async function fetchClinicsId(req, res) {
    let id = req.params.id
    const clinics = await clinicsModels.find({ _id: id }) // i for case insensitive
    console.log(clinics)
    try {
        return res.status(200).json({ msg: "Fetch by ID success", currentUserInfoClinic: clinics })
        //res.send(clinics);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchClinicsCity(req, res) {
    let address = req.params.address
    const clinics = await clinicsModels.find({ address: { $regex: address, $options: 'i' } }) // i for case insensitive
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

///put functions
async function updateClinic(req, res) {

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password, salt)

    try {
        const id = req.params.id;
        const business_name = req?.body?.business_name
        const specialities = req?.body?.specialities
        const email = req?.body?.email
        const phone = req?.body?.phone
        const password = hash
        const address = req?.body?.address
        const hours = req?.body?.hours
        const imageKey = req?.file?.filename || "clinicDefault.jpg"

        const updatedData = {
            business_name: business_name, specialities: specialities, email: email,
            phone: phone, password: password, address: address, hours: hours, imageKey: imageKey

        };
        const options = { new: true };

        const result = await clinicsModels.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}

//post functions for making a new clinic account
async function addClinics(req, res) {

    //bcrypt password hashing
    //generate and use salt for extra security
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password, salt)

    // Check if this user already exisits
    let clinics = await clinicsModels.findOne({ email: req.body.email });
    if (clinics) {
        return res.status(400).json({ msg: "This email is already in use. Please use another one." });
    } else {
        // Insert the new user if they do not exist yet
        clinics = new clinicsModels({
            business_name: req?.body?.business_name,
            specialities: req?.body?.specialities,
            email: req?.body?.email,
            phone: req?.body?.phone,
            password: hash,
            address: req?.body?.address,
            hours: req?.body?.hours,
            imageKey: req?.file?.filename || "clinicDefault.jpg"
        });
        await clinics.save();
        res.send(clinics);
    }
}

//Post request for login
async function loginClinic(req, res) {
    //email and password
    const email = req.body.email
    const password = req.body.password

    //find user exist or not
    clinicsModels.findOne({ email })
        .then(clinics => {
            //if user not exist than return status 400
            if (!clinics) return res.status(400).json({ msg: "This email is not registered as a user in our system" })

            //if user exist than compare password
            //password comes from the user
            //doctors.password comes from the database
            bcrypt.compare(password, clinics.password, (err, data) => {
                //if error then throw an error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    console.log(clinics)
                    return res.status(200).json({ msg: "Login success", currentUserInfoClinic: clinics, authenticated: true }) //currentUserInfo will be used as context in frontend
                } else {
                    return res.status(401).json({ msg: "Invalid credential" })
                }

            })

        })

}

module.exports = {
    fetchClinics,
    fetchClinicsId,
    fetchClinicsCity,
    deleteClinicsId,
    updateClinic,
    addClinics,
    loginClinic
}