"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_ctrls_1 = __importDefault(require("@/controllers/user-ctrls"));
const userRoutes = (0, express_1.Router)();
userRoutes.route("/").get((0, express_async_handler_1.default)(user_ctrls_1.default.getAllUsers));
userRoutes.route("/create").post((0, express_async_handler_1.default)(user_ctrls_1.default.createNewUser));
userRoutes.route("/login").post((0, express_async_handler_1.default)(user_ctrls_1.default.login));
exports.default = userRoutes;
