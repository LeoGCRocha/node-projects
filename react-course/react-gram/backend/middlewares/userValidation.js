import { body } from 'express-validator'

export function userFieldsValidation() {
    return [
        body('name')
            .notEmpty()
            .isString()
            .isLength({ min: 3 })
            .withMessage('Name is required'),
        body('email')
            .notEmpty()
            .isString()
            .isEmail()
            .withMessage('Email is required'),
        body('password')
            .notEmpty()
            .isString()
            .isLength({ min: 6 })
            .withMessage('Password is required'),
        body('passwordConfirmation')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match password')
                }
                return true
            })
    ]
}

export function loginValidation () {
    return [
        body('email')
            .notEmpty()
            .isString()
            .isEmail()
            .withMessage('Email is required'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ]
}

export function updateValidation() {
    return [
        body('name')
            .optional()
            .isLength({ min: 3})
            .withMessage('Name need to have at least 3 characters'),
        body('password')
            .optional()
            .isLength({ min: 5})
            .withMessage('Password need to have at least 5 characters')
    ]
}