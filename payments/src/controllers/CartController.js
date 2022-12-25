import Cart from '../models/Cart'

class CartController {
  async store(req, res) {
    try {
      if (req.params.id && req.user.isAdmin) {
        req.body.userId = req.params.id
      } else {
        req.body.userId = req.user.id
      }

      const hasCart = await Cart.find({
        userId: req.body.userId,
      })

      if (hasCart) {
        return res.status(500).json({
          error: 'User already have a cart',
        })
      }

      const cart = new Cart(req.body)
      cart.save()
      return res.status(200).json(cart)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async update(req, res) {
    try {
      if (req.params.id && req.user.isAdmin) {
        req.body.userId = req.params.id
      } else {
        req.body.userId = req.user.id
      }

      const updatedCart = await Cart.findByIdAndUpdate({
        userId: req.body.userId,
      }, {
        $set: req.body,
      }, {
        new: true,
      })

      return res.status(200).json(updatedCart)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async delete(req, res) {
    try {
      if (req.params.id && req.user.isAdmin) {
        req.body.userId = req.params.id
      } else {
        req.body.userId = req.userId
      }

      await Cart.findByIdAndDelete({
        userId: req.body.userId,
      })

      return res.status(200).json({
        message: 'Cart was successful deleted',
      })
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async findByUserId(req, res) {
    try {
      if (req.params.id && req.user.isAdmin) {
        req.body.userId = req.params.id
      } else {
        // Only admin can view other carts
        req.body.userId = req.user.id
      }

      const cart = await Cart.find({
        userId: req.body.userId,
      })

      if (!cart) {
        return res.status(500).json({
          error: 'User doesnt have any cart',
        })
      }

      const updatedCart = Cart.findByIdAndUpdate({
        userId: req.body.userId,
      }, {
        $set: req.body,
      }, {
        new: true,
      })

      return res.status(200).json(updatedCart)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }
}

export default new CartController()
