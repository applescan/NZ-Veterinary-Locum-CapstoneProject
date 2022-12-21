var express = require('express');
var clinicsController = require('../controllers/clinicsController')
var router = express.Router();

router.get(`/all`, function (req, res) { 
    clinicsController.fetchClinics(req, res)
})

router.get(`/search/:address`, function (req, res) { 
    clinicsController.fetchClinicsCity(req, res)
})

router.delete(`/delete/:id`, function (req, res) { 
    clinicsController.deleteClinicsId(req, res)
})

router.put(`/update/:id`, function (req, res) { 
    clinicsController.updateClinic(req, res)
})

router.post(`/add`, function (req, res) { 
    clinicsController.addClinics(req, res)
})

router.post(`/login`, function (req, res) { 
    clinicsController.loginClinic(req, res)
})

module.exports = router;