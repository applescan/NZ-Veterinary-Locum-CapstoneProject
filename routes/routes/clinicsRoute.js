var express = require('express');
var clinicsController = require('../controllers/clinicsController')
var router = express.Router();
let multer = require('multer'),
    uuidv4 = require('uuid/v4')

const DIR = 'public';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.get(`/all`, function (req, res) {
    clinicsController.fetchClinics(req, res)
})

router.get(`/search/:id`, function (req, res) {
    clinicsController.fetchClinicsId(req, res)
})

router.get(`/search/city/:city`, function (req, res) {
    clinicsController.fetchClinicsCity(req, res)
})

router.delete(`/delete/:id`, function (req, res) {
    clinicsController.deleteClinicsId(req, res)
})

router.post(`/update/:id`, upload.single('imageKey'), function (req, res) {
    clinicsController.updateClinic(req, res)
})

router.post(`/add`, upload.single('imageKey'), function (req, res) {
    clinicsController.addClinics(req, res)
})

router.post(`/login`,upload.none(), function (req, res) {
    clinicsController.loginClinic(req, res)
})

module.exports = router;