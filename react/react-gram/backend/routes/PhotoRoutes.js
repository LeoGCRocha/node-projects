import { Router } from 'express'
import { photoValidation, commentValidation } from '../middlewares/photoValidation'
import ValidationResult from '../middlewares/handleValidation.js'
import AuthGuard from '../middlewares/authGuard'
import imageUpload from '../middlewares/imageUpload'
import { 
        insertPhoto, 
        deletePhoto, 
        getAllPhotos, 
        getUserPhotos, 
        getPhotoById, 
        updatePhoto, 
        likePhoto,
        commentPhoto,
        findPhotoByTitle
} from '../controllers/PhotoController'

const router = Router()

router.post('/', 
            AuthGuard, 
            imageUpload.single("image"),
            photoValidation(),
            ValidationResult.handleValidation,
            insertPhoto
        )
router.delete('/:id', AuthGuard, deletePhoto)
router.get('/', AuthGuard, getAllPhotos)
router.get('/user/:id', AuthGuard, getUserPhotos)
router.put('/like/:id', AuthGuard, likePhoto)
router.put('/comment/:id', 
AuthGuard, 
commentValidation(), 
ValidationResult.handleValidation, 
commentPhoto
)
router.get('/search', AuthGuard, findPhotoByTitle)
router.get('/:id', AuthGuard, getPhotoById)
router.put('/:id', AuthGuard, updatePhoto)

export default router