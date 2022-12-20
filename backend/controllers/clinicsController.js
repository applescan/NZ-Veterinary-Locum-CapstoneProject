var getClinicssData = require('../services/dbServicesClinic.js') 

const fetchClinics = async (req, res) => {  
    let clinics = await getClinicssData.fetchClinics(req, res)
}
const fetchClinicsCity = async (req, res) => {  
    let clinics = await getClinicssData.fetchClinicsCity(req, res)
}
const deleteClinicsId = async (req, res) => {  
    let clinics = await getClinicssData.deleteClinicsId(req, res)
}
const updateClinic = async (req, res) => {  
    let clinics = await getClinicssData.updateClinic(req, res)
}
const addClinics = async (req, res) => {  
    let clinics = await getClinicssData.addClinics(req, res)
}
const loginClinic = async (req, res) => {  
    let clinics = await getClinicssData.loginClinic(req, res)
}

module.exports = {
    fetchClinics,
    fetchClinicsCity,
    deleteClinicsId,
    updateClinic,
    addClinics,
    loginClinic
}