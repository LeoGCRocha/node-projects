import { Router } from 'express'
import StripeController from '../controllers/StripeController'

const routes = Router()

routes.post('/payment', StripeController.payment)

export default routes
