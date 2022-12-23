import { Schema, model } from 'mongoose'
import CryptoJS from 'crypto-js'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    const hash = CryptoJS.AES.encrypt(this.password, process.env.PASSWORD_SECRET)
    this.password = hash
    return next()
  } catch (err) {
    console.log(err)
    return next(err)
  }
})

export default model('User', UserSchema)
