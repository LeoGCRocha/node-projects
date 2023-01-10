import mongoose from 'mongoose'
import Photo from '../models/Photo'
import User from '../models/User'

const insertPhoto = async (req, res) => {

    const { title } = req.body
    const image = req.file.filename
    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    const newPhoto = new Photo({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    await newPhoto.save()

    // Verify if photo was successfully saved
    if (!newPhoto) {
        res.status(422).json({
            errors: ["Photo was not saved"]
        })
        return 
    }

    res.status(200).json(newPhoto)
}
const deletePhoto = async (req, res) => {
    try {
        const { id } = req.params
        const reqUser = req.user
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))
        if (!photo) {
            res.status(404).json({
                errors: ["Photo not found"]
            })
            return
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(401).json({
                errors: ["You are not authorized to delete this photo"]
            })
            return
        }

        const deletedPhoto = await Photo.findByIdAndDelete(mongoose.Types.ObjectId(id))

        res.status(200).json({
            id: deletedPhoto._id,
            message: "Photo deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        })
    }
}

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort({ createdAt: -1 }).exec()
    res.status(200).json(photos)
}

const getUserPhotos = async (req, res) => {
    const { id } = req.params
    try {
        const photos = await Photo.find({ userId: id }).sort({ createdAt: -1 }).exec()
        res.status(200).json(photos)
    } catch (error) {
        res.status(400).json({
            errors: [error.message]
        })
    }
}

const getPhotoById = async(req, res) => {
    let photo
    try {
        const { id } = req.params
        photo = await Photo.findById(id)
        if (!photo) {
            res.status(404).json({
                errors: ["Photo not found"]
            })
            return
        } 
    } catch (error) {
        res.status(400).json({
            errors: ['Error while trying get photo.']
        })
        return
    }
    res.status(200).json(photo)
}

const updatePhoto = async(req, res) => {
    const { id } = req.params
    const { title } = req.body

    const photo = await Photo.findById(id)
    if (!photo) {
        res.status(404).json({
            errors: ["Photo not found"]
        })
        return
    }
    if (!photo.userId.equals(req.user._id)) {
        res.status(422).json({
            errors: ["You are not authorized to update this photo"]
        })
        return
    }
    if (title) {
        photo.title = title
    }
    try {
        await photo.save()
        res.status(200).json({
            message: "Photo updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        })
    }
}

const likePhoto = async(req, res) => {
    const { id } = req.params
    const reqUser = req.user

    const photo = await Photo.findById(id)
    if (!photo) {
        res.status(404).json({
            errors: ["Photo not found"]
        })
        return
    }
    
    // Check if user has already liked the photo
    const isLiked = photo.likes.find(like => like.userId.equals(reqUser._id))
    if (isLiked) {
        res.status(400).json({
            errors: ["You have already liked this photo"]
        })
        return
    }

    photo.likes.push({
        userId: reqUser._id,
        userName: reqUser.name,
        photoId: photo._id,
    })

    photo.save()

    res.status(200).json({
        userId: reqUser._id,
        photoId: photo._id,
        message: "Like was sent."
    })
}

const commentPhoto = async(req, res) => {
    const { id } = req.params
    const { comment } = req.body

    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    if (!user || !photo) {
        res.status(400).json({
            errors: ["Invalid parameters"]
        })
        return 
    }
    
    const obj = {
        comment: comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(obj)

    await photo.save()

    res.status(200).json(obj)
}

const findPhotoByTitle = async(req, res) => {
    const { q } = req.query 
    const photos = await Photo.find({ title: new RegExp(q, "i") }).exec()
    res.status(200).json(photos)
}

export {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    findPhotoByTitle
}