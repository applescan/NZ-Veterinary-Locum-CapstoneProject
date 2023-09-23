var express = require('express');
var doctorsController = require('../controllers/doctorsController')
const cloudinary = require("cloudinary").v2;
var router = express.Router();
let multer = require('multer')
var upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

async function handleUpload(buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
        }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        }).end(buffer);
    });
}

router.get(`/all`, function (req, res) {
    doctorsController.fetchDoctors(req, res)
})

router.get(`/search/:id`, function (req, res) {
    doctorsController.fetchDoctorsId(req, res)
})

router.get(`/search/city/:city`, function (req, res) {
    doctorsController.fetchDoctorsCity(req, res)
})

router.delete(`/delete/:id`, function (req, res) {
    doctorsController.deleteDoctorsId(req, res)
})

router.post(`/update/:id`, upload.single('imageKey'), async function (req, res) {
    if (req.file) {
        try {
            const result = await handleUpload(req.file.buffer);
            req.body.imageKey = result.secure_url; 
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    doctorsController.updateDoctor(req, res);
});

router.post(`/add`, upload.single('imageKey'), async function (req, res) {
    if (req.file) {
        try {
            const result = await handleUpload(req.file.buffer);
            req.body.imageKey = result.secure_url; 
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    doctorsController.addDoctor(req, res);
});


router.post(`/login`, upload.none(), function (req, res) {
    doctorsController.loginDoctor(req, res)
})

module.exports = router;