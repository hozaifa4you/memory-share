"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const memory_ctrls_1 = __importDefault(require("@/controllers/memory-ctrls"));
const authentication_1 = require("@/middleware/authentication");
const memory_image_upload_1 = require("@/middleware/memory-image-upload");
const memoryRoutes = (0, express_1.Router)();
memoryRoutes
    .route("/create")
    .post((0, express_async_handler_1.default)(authentication_1.authentication), (0, express_async_handler_1.default)(memory_ctrls_1.default.createMemory));
memoryRoutes.route("/upload").post((0, express_async_handler_1.default)(authentication_1.authentication), (0, express_async_handler_1.default)(memory_image_upload_1.memoryImageUpload.array("memory", 5)), (0, express_async_handler_1.default)((req, res) => {
    const files = req.files;
    if ((files === null || files === void 0 ? void 0 : files.length) === 0) {
        res.status(500);
        throw new Error("⚠️ files not found! ❌");
    }
    res.status(200).json(files);
}));
exports.default = memoryRoutes;
