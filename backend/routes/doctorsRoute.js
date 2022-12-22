var express = require('express');
var doctorsController = require('../controllers/doctorsController')
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
    doctorsController.fetchDoctors(req, res)
})

router.get(`/search/:id`, function (req, res) {
    doctorsController.fetchDoctorsId(req, res)
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

router.post(`/add`, upload.single('imageKey'), function (req, res) {
    // console.log(req.body)
    doctorsController.addDoctor(req, res)
})

router.post(`/login`, upload.none(), function (req, res) {
    doctorsController.loginDoctor(req, res)
})

module.exports = router;