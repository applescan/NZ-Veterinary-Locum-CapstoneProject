const doctorsModels = require('../models/doctorsModels.js');
const bcrypt = require('bcryptjs');

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

    try {
        const id = req.params.id;
        const first_name = req?.body?.first_name
        const last_name = req?.body?.last_name
        const specialities = req?.body?.specialities
        const email = req?.body?.email
        const phone = req?.body?.phone
        const city = req?.body?.city
        const license = req?.body?.license
        const availability = req?.body?.availability
        const work_requirement = req?.body?.work_requirement

        const updatedData = {
            first_name: first_name, last_name: last_name, specialities: specialities, email: email,
            phone: phone, city: city, license: license, availability: availability,
            work_requirement: work_requirement
        };

        //if the req file exist then it will update image key (adding image key to updated data)
        if (req.file) {
            updatedData.imageKey = req?.file?.filename
        }

        //if the req password exist then it will update password (adding password to updated data)
        if (req.body.password?.length) {
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(req.body.password, salt)
            updatedData.password = hash
        }

        const options = { new: true };

        const result = await doctorsModels.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}



//post functions for making a new doctor account
async function addDoctor(req, res) {

    //bcrypt password hashing
    //generate and use salt for extra security
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password, salt)

    // Check if this user already exisits
    let doctors = await doctorsModels.findOne({ email: req.body.email });
    if (doctors) {
        return res.status(400).json({ msg: "This email is already in use. Please use another one." });
    } else {
        // Insert the new user data
        doctors = new doctorsModels({
            first_name: req?.body?.first_name,
            last_name: req?.body?.last_name,
            specialities: req?.body?.specialities,
            email: req?.body?.email,
            phone: req?.body?.phone,
            password: hash,
            city: req?.body?.city,
            license: req?.body?.license,
            availability: req?.body?.availability,
            work_requirement: req?.body?.work_requirement,
            imageKey: req?.file?.filename || "default.jpg"
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