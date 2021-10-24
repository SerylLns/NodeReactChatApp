const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: `${__dirname}/../client-chat/public/uploads/users/`,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});
// const uploadFile = multer({ storage: storage }).single("file");
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    console.log(file);
    if ( !file.originalname.match(/\.(png|jpg|jpeg|gif|jfif)$/)) {
      // upload only png and jpg format
        return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
}); 

module.exports = imageUpload;