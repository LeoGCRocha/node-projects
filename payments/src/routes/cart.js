import { Router } from 'express'
import CartController from '../controllers/CartController'
import Token from './verifyToken'

const routes = Router()

// TODO: Finish CRUD to all Cart operations
// TODO: Finish CRUD to all Order operations

routes.get('/cart', Token.verifyTokenAndAuthorization, CartController.findAll)
routes.post('/cart', Token.verifyTokenAndAuthorization, CartController.post)
routes.put('/cart/:id', Token.verifyTokenAndAuthorization, CartController.update)
routes.delete('/cart/:id', Token.verifyTokenAndAuthorization, CartController.delete)

export default routes
