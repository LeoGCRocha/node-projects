import * as Yup from 'yup'
import Order from '../models/Order'

class OrderController {
  async store(req, res) {
    const { id } = req.user
    req.body.userId = id

    const schema = Yup.object().shape({
      amount: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(500).json({
        error: 'Invalid order schema',
      })
    }

    try {
      const order = new Order(req.body)
      await order.save()

      return res.status(200).json(order)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async index(req, res) {
    try {
      let userId
      if (req.params.userId && req.user.isAdmin) {
        userId = req.params.userId
      } else {
        userId = req.user.id
      }

      const orders = await Order.find({
        userId,
      })
      return res.status(200).json(orders)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await Order.findByIdAndDelete(id)

      return res.status(200).json({
        message: 'Order has benn deleted',
      })
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async update(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, {
        new: true,
      })

      return res.status(200).json(order)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async findAll(req, res) {
    try {
      const orders = await Order.find()

      return res.status(200).json(orders)
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        error: err,
      })
    }
  }

  async income(req, res) {
    try {
      const date = new Date()
      const previousMonth = new Date(date.setMonth(date.getMonth() - 2))

      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ])

      return res.status(200).send(income)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }
}

export default new OrderController()
