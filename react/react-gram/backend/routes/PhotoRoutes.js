import { Router } from 'express'
import { photoValidation } from '../middlewares/photoValidation'
import ValidationResult from '../middlewares/handleValidation.js'
import AuthGuard from '../middlewares/authGuard'
import imageUpload from '../middlewares/imageUpload'
import { insertPhoto, deletePhoto } from '../controllers/PhotoController'

const router = Router()

router.post('/', 
            AuthGuard, 
            imageUpload.single("image"),
            photoValidation(),
            ValidationResult.handleValidation,
            insertPhoto
        )
router.delete('/:id', AuthGuard, deletePhoto)

export default router