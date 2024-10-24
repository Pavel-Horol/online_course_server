"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AuthValidator {
    constructor(registration = [
        (0, express_validator_1.body)('email')
            .isEmail()
            .withMessage('Please enter a valid email address'),
        (0, express_validator_1.body)('password')
            .isLength({ min: 4, max: 12 })
            .withMessage('Password must be within 4 and 12 characters long')
    ], login = [
        (0, express_validator_1.body)('email')
            .isEmail()
            .withMessage('Please enter a valid email address'),
        (0, express_validator_1.body)('password')
            .isLength({ min: 4, max: 12 })
            .withMessage('Password must be within 4 and 12 characters long')
    ], activation = [
        (0, express_validator_1.param)('link')
            .notEmpty()
            .withMessage('Activation link is required')
    ]) {
        this.registration = registration;
        this.login = login;
        this.activation = activation;
    }
}
exports.default = new AuthValidator();
