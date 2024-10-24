"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const setCookie = (res, name, value, options = {}) => {
    const defaultOptions = Object.assign({ httpOnly: true, secure: false, sameSite: 'strict', maxAge: 2 * 24 * 60 * 60 * 1000 }, options);
    res.cookie(name, value, defaultOptions);
};
exports.setCookie = setCookie;
