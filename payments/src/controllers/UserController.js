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

  async update(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, {
        new: true,
      })

      return res.status(200).json(updatedUser)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async delete(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id)

      return res.status(200).json('User has been deleted')
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async index(req, res) {
    try {
      const user = await User.findById(req.params.id)

      // eslint-disable-next-line no-unused-vars, no-underscore-dangle
      const { password, ...userWithoutPassowrd } = user._doc

      return res.status(200).json(userWithoutPassowrd)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async findAll(req, res) {
    const query = req.params.new

    try {
      const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()

      users.forEach((user, index) => {
        // eslint-disable-next-line no-unused-vars, no-underscore-dangle
        const { password, ...userWithoutPassowrd } = user._doc

        users[index] = userWithoutPassowrd
      })

      return res.status(200).json(users)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async stats(req, res) {
    const date = new Date()
    const lastYear = new Date(date.setFullYear() - 1)

    try {
      const data = await User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: lastYear,
            },
          },
        },
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ])

      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({
        error: err,
      })
    }
  }
}

export default new UserController()
