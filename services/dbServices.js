const doctorsModels = require('../models/doctorsModels.js');
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

async function fetchDoctorsId(req, res) {
    let id = req.params.id
    const doctors = await doctorsModels.find({ _id: id }) // i for case insensitive
    console.log(doctors)
    try {
        return res.status(200).json({ msg: "Fetch by ID success", currentUserInfo: doctors })
        //res.send(doctors );
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchDoctorsCity(req, res) {
    let city = req.params.city
    const doctors = await doctorsModels.find({ city: { $regex: city, $options: 'i' } }) // i for case insensitive
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
    const updatedData = {
        ...req.body // Destructure to simplify
    };

    if (req.file) {
        const result = await handleUpload(req.file.buffer);
        updatedData.imageKey = result.url; // Update the Cloudinary URL
    }
    
    if (req.body.password?.length) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);
        updatedData.password = hash;
    }

    const options = { new: true };
    const result = await doctorsModels.findByIdAndUpdate(req.params.id, updatedData, options);
    res.send(result);
}


//post functions for making a new doctor account
async function addDoctor(req, res) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);

    // If no imageKey is provided in req.body, use the default image URL
    const imageKey = req.body.imageKey || "https://res.cloudinary.com/dek61sfoh/image/upload/v1695461753/default_mrcmjv.jpg";

    let doctors = await doctorsModels.findOne({ email: req.body.email });
    if (doctors) {
        return res.status(400).json({ msg: "This email is already in use. Please use another one." });
    } else {
        doctors = new doctorsModels({
            ...req.body, 
            password: hash,
            imageKey: imageKey
        });
        await doctors.save();
        res.send(doctors);
    }
}


//Post request for login
async function loginDoctor(req, res) {
    //email and password
    const email = req.body.email
    const password = req.body.password

    //find user exist or not
    doctorsModels.findOne({ email })
        .then(doctors => {
            //if user not exist than return status 400
            if (!doctors) return res.status(400).json({ msg: "This email is not registered as a user in our system" })

            //if user exist than compare password
            //password comes from the user
            //doctors.password comes from the database
            bcrypt.compare(password, doctors.password, (err, data) => {
                //if error then throw an error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    console.log(doctors)
                    return res.status(200).json({ msg: "Login success", currentUserInfo: doctors, authenticated: true }) //currentUserInfo will be used as context in frontend
                } else {
                    return res.status(401).json({ msg: "Invalid credential" })
                }

            })

        })

}

module.exports = {
    fetchDoctors,
    fetchDoctorsId,
    fetchDoctorsCity,
    deleteDoctorsId,
    updateDoctor,
    addDoctor,
    loginDoctor
}