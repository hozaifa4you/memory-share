import multer from "multer";
import path from "path";

const UPLOAD_FOLDER = "./public/memory/";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, UPLOAD_FOLDER);
  },
  filename(req, file, callback) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    callback(null, fileName + fileExt);
  },
});

export const memoryImageUpload = multer({
  storage,
  limits: { fileSize: 3e6 },
  fileFilter(req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(new Error("❌ Only jpeg, jpg or png format image allowed! ⚠️"));
    }
  },
});
