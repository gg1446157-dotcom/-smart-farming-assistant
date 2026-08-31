const express = require("express");
const multer = require("multer");
const path = require("path");
const{detectDisease} = require("../controllers/diseaseController");

const router = express.Router();


// ==========================================
// IMAGE UPLOAD CONFIGURATION
// ==========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const extension = path.extname(file.originalname);

        const filename =
            Date.now() + extension;

        cb(null, filename);
    }

});


const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(new Error("Only image files are allowed"));

        }

    }
});


// ==========================================
// DISEASE DETECTION
// ==========================================

router.post(
    "/detect",
    upload.single("cropImage"),
    detectDisease
);


module.exports = router;