import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import User from '../models/User'

class AuthController {
  async login(req, res) {
    const { username } = req.body
    const originalPassword = req.body.password

    try {
      const user = await User.findOne({
        username,
      })

      if (!user) {
        return res.status(401).json({
          error: 'Invalid username',
        })
      }

      const unhashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET,
      ).toString(CryptoJS.enc.Utf8)

      if (originalPassword !== unhashedPassword) {
        return res.status(401).json({
          error: 'Invalid password.',
        })
      }

      const accessToken = jwt.sign({
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        isAdmin: user.isAdmin,
      }, process.env.JWT_SECRET, {
        expiresIn: '3d',
      })

      // eslint-disable-next-line no-underscore-dangle, no-unused-vars
      const { password, ...userWithoutPassword } = user._doc

      return res.status(200).json({ userWithoutPassword, accessToken })
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }
}

export default new AuthController()
