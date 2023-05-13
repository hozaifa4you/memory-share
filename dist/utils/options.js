"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = exports.NODE_ENV = void 0;
var NODE_ENV;
(function (NODE_ENV) {
    NODE_ENV["DEV"] = "development";
    NODE_ENV["PRO"] = "production";
})(NODE_ENV = exports.NODE_ENV || (exports.NODE_ENV = {}));
var ErrorType;
(function (ErrorType) {
    ErrorType["CastError"] = "CastError";
    ErrorType[ErrorType["MongoDuplicateError"] = 11000] = "MongoDuplicateError";
    ErrorType["ValidationError"] = "ValidationError";
    ErrorType["NoDirError"] = "ENOENT";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
