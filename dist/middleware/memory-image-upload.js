"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryImageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const UPLOAD_FOLDER = "./public/memory/";
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, UPLOAD_FOLDER);
    },
    filename(req, file, callback) {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
            "-" +
            Date.now();
        callback(null, fileName + fileExt);
    },
});
exports.memoryImageUpload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 3e6 },
    fileFilter(req, file, callback) {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            callback(null, true);
        }
        else {
            callback(new Error("❌ Only jpeg, jpg or png format image allowed! ⚠️"));
        }
    },
});
