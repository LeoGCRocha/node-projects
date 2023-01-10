import { Router } from 'express'
import { 
        register, 
        login, 
        getCurrentLoggedInUser, 
        update, 
        getUserById 
} from '../controllers/UserController.js'
import * as UserValidation from '../middlewares/userValidation.js'
import ValidationResult from '../middlewares/handleValidation.js'
import AuthGuard from '../middlewares/authGuard.js'
import ImageUpload from '../middlewares/imageUpload.js'

const routes = Router()

routes.post("/register", UserValidation.userFieldsValidation(), ValidationResult.handleValidation, register)
routes.post('/login', UserValidation.loginValidation(), ValidationResult.handleValidation, login)
routes.get('/profile', AuthGuard,  getCurrentLoggedInUser)
routes.put('/update', 
            AuthGuard, 
            UserValidation.updateValidation(), 
            ValidationResult.handleValidation,
            ImageUpload.single("profileImage"),
            update
        )
routes.get('/:id', getUserById)

export default routes   