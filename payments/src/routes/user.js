import { Router } from 'express'
import UserController from '../controllers/UserController'
import Token from './verifyToken'

const routes = Router()

routes.put('/user/:id', Token.verifyTokenAndAuthorization, UserController.update)
routes.delete('/user/:id', Token.verifyTokenAndAdmin, UserController.delete)
routes.get('/user/:id', Token.verifyTokenAndAdmin, UserController.index)
routes.get('/users', Token.verifyTokenAndAdmin, UserController.findAll)
routes.get('/stats', Token.verifyTokenAndAdmin, UserController.stats)

export default routes
