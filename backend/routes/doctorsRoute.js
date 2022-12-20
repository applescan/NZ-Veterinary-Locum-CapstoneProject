var express = require('express');
var doctorsController = require('../controllers/doctorsController')
var router = express.Router();

router.get(`/all`, function (req, res) { 
    doctorsController.fetchDoctors(req, res)
})

router.get(`/search/:city`, function (req, res) { 
    doctorsController.fetchDoctorsCity(req, res)
})

router.delete(`/delete/:id`, function (req, res) { 
    doctorsController.deleteDoctorsId(req, res)
})

router.put(`/update/:id`, function (req, res) { 
    doctorsController.updateDoctor(req, res)
})

router.post(`/add`, function (req, res) { 
    doctorsController.addDoctor(req, res)
})

module.exports = router;