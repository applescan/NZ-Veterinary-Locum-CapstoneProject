var express = require('express');
var jobsController = require('../controllers/jobsController')
var router = express.Router();

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

router.post(`/add`, function (req, res) {
    jobsController.addJobs(req, res)
})

module.exports = router;