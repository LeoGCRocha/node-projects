import { validationResult } from 'express-validator'

const handleValidation = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push(`${err.param} : ${err.msg}`))

        return res.status(422).json({
            errors: extractedErrors,
        })
    }
    next()
}

export default { handleValidation  }
