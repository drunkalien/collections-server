import multer from "multer";
const ALLOWED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const singleUpload = upload.single("image");

export const singleUploadCtrl = (req: any, res: any, next: any) => {
  singleUpload(req, res, (error: any) => {
    if (error) {
      res.status(422).json({ success: false, message: "Image upload failed!" });
    }

    next();
  });
};
