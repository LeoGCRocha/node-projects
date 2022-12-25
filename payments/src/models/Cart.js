import { Schema, model } from 'mongoose'

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
}, {
  timestamps: true,
})

export default model('Cart', CartSchema)
