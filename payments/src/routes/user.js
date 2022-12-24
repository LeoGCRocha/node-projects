import { Router } from 'express'
import UserController from '../controllers/UserController'
import verifyToken from './verifyToken'

const routes = Router()

routes.put('/user/:id', verifyToken, UserController.update)

export default routes
