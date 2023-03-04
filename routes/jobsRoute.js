var express = require('express');
var jobsController = require('../controllers/jobsController')
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
    jobsController.fetchJobs(req, res)
})

router.get(`/search/:location`, function (req, res) {
    jobsController.fetchJobsCity(req, res)
})

router.get(`/search/id/:jobId`, function (req, res) {
    jobsController.fetchJobsId(req, res)
})

router.get(`/search/clinic/:clinicId`, function (req, res) {
    jobsController.fetchJobsFromClinicId(req, res)
})

router.delete(`/delete/:id`, function (req, res) {
    jobsController.deleteJobsId(req, res)
})

router.delete(`/delete/clinic/:clinicId`, function (req, res) {
    jobsController.deleteClinicId(req, res)
})

router.post(`/update/:id`, function (req, res) {
    jobsController.updateJob(req, res)
})

router.post(`/add`, upload.none(), function (req, res) {
    jobsController.addJobs(req, res)
})

module.exports = router;