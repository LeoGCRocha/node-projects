import CryptoJS from 'crypto-js'
import User from '../models/User'

class AuthController {
  async login(req, res) {
    const { username, password } = req.body

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

      if (password !== unhashedPassword) {
        return res.status(401).json({
          error: 'Invalid password.',
        })
      }

      return res.status(200).json({
        message: 'Successful Login',
      })
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }
}

export default new AuthController()
