import { Router } from 'express'
import ProductController from '../controllers/ProductController'
import Token from './verifyToken'

const routes = Router()

routes.post('/product', Token.verifyTokenAndAdmin, ProductController.store)
routes.get('/product/:id', Token.verifyTokenAndAdmin, ProductController.index)
routes.get('/products', Token.verifyTokenAndAdmin, ProductController.findAll)
routes.delete('/product/:id', Token.verifyTokenAndAdmin, ProductController.delete)
routes.put('/product/:id', Token.verifyTokenAndAdmin, ProductController.update)

export default routes
