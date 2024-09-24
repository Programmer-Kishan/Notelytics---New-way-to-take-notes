import express, { RequestHandler } from "express";
import multer from "multer";
import * as UploadController from "../controller/upload.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body, req.file)
    console.log(file)
    const type = file.fieldname
    if (type === "pdf") cb(null, "../backend/pdfs");
    if (type === "image") cb(null, "../backend/images");
    if (type === "video") cb(null, "../backend/videos");
    // console.log(req.body);
    // cb(null, '../backend/pdfs');
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});


const upload = multer({ storage });

router.post("/", upload.fields([{name: "pdf"}, {name: 'image'}, {name: 'video'}]), UploadController.uploadDoc);

export default router;
