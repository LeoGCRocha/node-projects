import * as Yup from 'yup'
import Product from '../models/Product'

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      desc: Yup.string().required(),
      img: Yup.string().required(),
      categories: Yup.array().min(1).required(),
      size: Yup.number().required(),
      price: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(500).json({
        error: 'Invalid schema',
      })
    }

    try {
      const product = await Product.create(req.body)

      return res.status(200).json(product)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, {
        new: true,
      })

      return res.status(200).json(updatedProduct)
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        error: err,
      })
    }
  }

  async delete(req, res) {
    try {
      await Product.findByIdAndDelete(
        req.params.id,
      )

      return res.status(200).json({
        message: 'Product has been deleted',
      })
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async index(req, res) {
    try {
      const product = await Product.findById(req.params.id)

      return res.status(200).json(product)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }

  async findAll(req, res) {
    try {
      const queryNew = req.query.new
      const queryCategory = req.query.category

      let products

      if (queryNew) {
        products = await Product.find().sort({
          createdAt: -1,
        }).limit(5)
      } else if (queryCategory) {
        products = await Product.find({
          categories: {
            $in: [queryCategory],
          },
        })
      } else {
        products = await Product.find()
      }

      return res.status(200).json(products)
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }
}

export default new ProductController()
