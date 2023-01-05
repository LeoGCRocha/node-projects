import { Router } from 'express'
import userRoutes from './UserRoutes'
import photoRoutes from './PhotoRoutes'

const router = Router()

router.use("/api/users/", userRoutes)
router.use("/api/photos/", photoRoutes)

export default router