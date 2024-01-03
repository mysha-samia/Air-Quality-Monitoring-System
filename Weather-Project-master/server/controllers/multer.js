// FILE UPLOAD
const multer = require("multer")

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype === "text/csv"){
            cb(null, "./Uploads/csv")
        }
        else if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            cb(null, "./Uploads/images")
        }
        else{
            cb(null, "./Uploads/others")
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace("(", "_").replace(")", "_")
        .replace(" ", "_").replace(" ", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_").replace("-", "_"))
    }, 
})

const multerUpload = multer({storage: fileStorageEngine})

module.exports = multerUpload
