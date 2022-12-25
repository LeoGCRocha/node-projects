import { Router } from 'express'
import OrderController from '../controllers/OrderController'
import Token from './verifyToken'

const routes = Router()

routes.post('/order', Token.verifyTokenAndAuthorization, OrderController.store)
routes.delete('/order/:id', Token.verifyTokenAndAdmin, OrderController.delete)
routes.get('/orders', Token.verifyTokenAndAdmin, OrderController.findAll)
routes.get('/order/:userId', Token.verifyTokenAndAuthorization, OrderController.index)
routes.put('/order/:id', Token.verifyTokenAndAdmin, OrderController.update)
routes.get('/income', Token.verifyTokenAndAdmin, OrderController.income)

export default routes
