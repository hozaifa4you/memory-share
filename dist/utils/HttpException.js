"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
/* eslint-disable no-self-assign */
class HttpException extends Error {
    constructor(message, status, error) {
        super(message);
        this.status = status;
        this.message = message;
        this.error = error || null;
        this.code = this.code;
        this.keyValue = this.keyValue;
        this.errors = this.errors;
    }
}
exports.HttpException = HttpException;
