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

    //bcrypt password hashing
    //generate and use salt for extra security
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password, salt)

    const doctors = new doctorsModels({
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


//Post request for login
async function loginDoctor(req, res) {
    //email and password
    const email = req.body.email
    const password = req.body.password

    //find user exist or not
    doctorsModels.findOne({ email })
        .then(doctors => {
            //if user not exist than return status 400
            if (!doctors) return res.status(400).json({ msg: "User does not exist" })

            //if user exist than compare password
            //password comes from the user
            //doctors.password comes from the database
            bcrypt.compare(password, doctors.password, (err, data) => {
                //if error than throw error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    return res.status(200).json({ msg: "Login success" }) //will send to the homepage with special profile page
                } else {
                    return res.status(401).json({ msg: "Invalid credential" })
                }

            })

        })

}

module.exports = {
    fetchDoctors,
    fetchDoctorsCity,
    deleteDoctorsId,
    updateDoctor,
    addDoctor,
    loginDoctor
}