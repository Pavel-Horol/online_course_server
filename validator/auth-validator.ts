import { body, param } from "express-validator";

class AuthValidator {
    constructor(
        public registration = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email address'),
            body('password')
                .isLength({min: 4, max: 12})
                .withMessage('Password must be within 4 and 12 characters long')
        ],
        public login = [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email address'),
            body('password')
                .isLength({min: 4, max: 12})
                .withMessage('Password must be within 4 and 12 characters long')
        ],
        public activation = [
            param('link')
                .notEmpty()
                .withMessage('Activation link is required')
        ]
    ){}
}

export default new AuthValidator()