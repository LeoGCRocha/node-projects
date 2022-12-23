import { Router } from 'express'
import UserController from '../controllers/UserController'
import AuthController from '../controllers/AuthController'

const routes = Router()

// REGISTER
routes.post('/auth/register', UserController.store)

// LOGIN
routes.post('/auth/login', AuthController.login)

export default routes
