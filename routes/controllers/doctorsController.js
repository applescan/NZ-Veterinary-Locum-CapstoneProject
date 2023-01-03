var getDoctorsData = require('../services/dbServices.js')

const fetchDoctors = async (req, res) => {
    let doctors = await getDoctorsData.fetchDoctors(req, res)
}
const fetchDoctorsId = async (req, res) => {
    let doctors = await getDoctorsData.fetchDoctorsId(req, res)
}
const fetchDoctorsCity = async (req, res) => {
    let doctors = await getDoctorsData.fetchDoctorsCity(req, res)
}
const deleteDoctorsId = async (req, res) => {
    let doctors = await getDoctorsData.deleteDoctorsId(req, res)
}
const updateDoctor = async (req, res) => {
    let doctors = await getDoctorsData.updateDoctor(req, res)
}
const addDoctor = async (req, res) => {
    let doctors = await getDoctorsData.addDoctor(req, res)
}
const loginDoctor = async (req, res) => {
    let doctors = await getDoctorsData.loginDoctor(req, res)
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