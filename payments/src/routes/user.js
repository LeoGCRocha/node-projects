import { Router } from 'express'

const routes = Router()

routes.get('/users', (req, res) => {
  res.status(200).json({
    ok: true,
  })
})

routes.post('/users', (req, res) => {
  res.status(200).json({
    ok: true,
  })
})

export default routes
