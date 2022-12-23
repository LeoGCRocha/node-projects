import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(500).json({
        error: 'Invalid JSON Schema',
      })
    }

    const newUser = new User(req.body)

    try {
      const responseUser = await newUser.save()
      return res.status(200).json(responseUser)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }
}

export default new UserController()
