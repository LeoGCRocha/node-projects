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
        userName: user.username
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

export {
    insertPhoto,
    deletePhoto
}