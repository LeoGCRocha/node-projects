import Stripe from 'stripe'

class StripeController {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }

  async payment(req, res) {
    try {
      this.stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd',
      }, (stripError, stripeResponse) => {
        if (stripError) {
          return res.status(500).json({
            error: stripError,
          })
        }
        return res.status(200).json({
          success: stripeResponse,
        })
      })
    } catch (err) {
      return res.status(500).json({
        error: err,
      })
    }
  }
}

export default new StripeController()
