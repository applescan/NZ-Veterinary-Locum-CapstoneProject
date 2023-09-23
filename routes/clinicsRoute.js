var express = require('express');
var clinicsController = require('../controllers/clinicsController')
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

router.post(`/update/:id`, upload.single('imageKey'), async function (req, res) {
    if (req.file) {
        try {
            const result = await handleUpload(req.file.buffer);
            req.body.imageKey = result.secure_url; 
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    clinicsController.updateClinic(req, res);
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
    clinicsController.addClinics(req, res);
});


router.post(`/login`,upload.none(), function (req, res) {
    clinicsController.loginClinic(req, res)
})

module.exports = router;