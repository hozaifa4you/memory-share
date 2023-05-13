"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const HttpException_1 = require("@/utils/HttpException");
const options_1 = require("@/utils/options");
const zod_1 = require("zod");
dotenv_1.default.config();
// const not found
const notFound = (req, res, next) => {
    const message = `🔥 The requested path was not found ${req.originalUrl} ❌`;
    return next(new HttpException_1.HttpException(message, 404, null));
};
exports.notFound = notFound;
// main error handler
const errorHandler = (err, req, res, next) => {
    var _a;
    let status = err.status || 500;
    let message = err.message || "🔥 internal server error ❌";
    let errors = [];
    // TODO: zod error
    if (err instanceof zod_1.ZodError) {
        const zodErrors = err.errors.map((error) => {
            return { path: error.path[0], message: error.message };
        });
        console.error("🚀🚀❌❌ error showing: ", zodErrors);
        status = 400;
        message = "ValidationError";
        errors = zodErrors;
    }
    // TODO: no directory error
    if (((_a = err.code) === null || _a === void 0 ? void 0 : _a.toString()) === options_1.ErrorType.NoDirError) {
        message = "File not found or path is invalid!";
        status = 404;
    }
    // TODO: duplicate error
    // console.error("🚀🚀❌❌ error showing: ", err);
    return res.status(status).json({
        success: false,
        stack: String(process.env.NODE_ENV) === String(options_1.NODE_ENV.DEV)
            ? err.stack
            : "⚠️ not permitted ❌",
        message,
        errors: errors.length > 0 ? errors : null,
    });
};
exports.errorHandler = errorHandler;
