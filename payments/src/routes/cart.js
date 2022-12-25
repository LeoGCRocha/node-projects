import { Router } from 'express'
import CartController from '../controllers/CartController'
import Token from './verifyToken'

const routes = Router()

routes.get('/cart/:id', Token.verifyTokenAndAuthorization, CartController.findByUserId)
routes.post('/cart/:id', Token.verifyTokenAndAuthorization, CartController.store)
routes.put('/cart/:id', Token.verifyTokenAndAuthorization, CartController.update)
routes.delete('/cart/:id', Token.verifyTokenAndAuthorization, CartController.delete)

export default routes
