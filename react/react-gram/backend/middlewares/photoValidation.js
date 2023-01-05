import { body } from 'express-validator'

export function photoValidation() {
    return [
        body('title')
            .not()
            .equals('undefined')
            .withMessage('Title is required')
            .isString()
            .withMessage('Title must be a string')
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        body('image').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Image is required')
            } 
            return true
        })
    ]
}