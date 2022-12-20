var express = require('express');
var jobsController = require('../controllers/jobsController')
var router = express.Router();

router.get(`/all`, function (req, res) { 
    jobsController.fetchJobs(req, res)
})

router.get(`/search/:location`, function (req, res) { 
    jobsController.fetchJobsCity(req, res)
})

router.delete(`/delete/:id`, function (req, res) { 
    jobsController.deleteJobsId(req, res)
})

router.put(`/update/:id`, function (req, res) { 
    jobsController.updateJob(req, res)
})

router.post(`/add`, function (req, res) { 
    jobsController.addJobs(req, res)
})

module.exports = router;