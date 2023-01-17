import mongoose, { Schema } from "mongoose"

const photoSchema = new Schema(
    {
        image: String,
        title: String, 
        likes: Array,
        comments: Array,
        userId: Schema.Types.ObjectId,
        userName: String
    },
    {
        timestamps: true
    }
)

const Photo = mongoose.model("Photo", photoSchema)

export default Photo