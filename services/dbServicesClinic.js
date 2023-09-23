const clinicsModels = require('../models/clinicsModels.js');
const bcrypt = require('bcryptjs');
const cloudinary = require("cloudinary").v2;

async function handleUpload(buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
        }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        }).end(buffer);
    });
}


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
    let city = req.params.city
    const clinics = await clinicsModels.find({ city: { $regex: city, $options: 'i' } }) // i for case insensitive
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
    const updatedData = { ...req.body }; // Destructure to simplify

    // If an image file is provided in the request, upload to Cloudinary
    if (req.file) {
        const result = await handleUpload(req.file.buffer);
        updatedData.imageKey = result.url;
    }

    // If a new password is provided in the request, hash it
    if (req.body.password?.length) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);
        updatedData.password = hash;
    }

    try {
        const options = { new: true };
        const result = await clinicsModels.findByIdAndUpdate(req.params.id, updatedData, options);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


//post functions for making a new clinic account
async function addClinics(req, res) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);

    // If no imageKey is provided in req.body, use the default image URL
    const imageKey = req.body.imageKey || "https://res.cloudinary.com/dek61sfoh/image/upload/v1695461754/clinicDefault_ymtefd.jpg";

    let clinics = await clinicsModels.findOne({ email: req.body.email });
    if (clinics) {
        return res.status(400).json({ msg: "This email is already in use. Please use another one." });
    } else {
        clinics = new clinicsModels({
            ...req.body,
            password: hash,
            imageKey: imageKey 
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