import { NextApiRequest, NextApiResponse } from 'next'

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '~/lib/config'
import { formatAmountForStripe } from '~/lib/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: '2020-08-27',
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const amount: number = req.body.amount
		try {
			// Validate the amount that was passed from the client.
			if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
				throw new Error('Invalid amount.')
			}
			console.log('LINE ITEMS', req.body.line_items)
			// Create Checkout Sessions from body params.
			const params: Stripe.Checkout.SessionCreateParams = {
				submit_type: 'pay',
				payment_method_types: ['card'],
				line_items: req.body.line_items,

				success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/cart`,
			}
			const checkoutSession: Stripe.Checkout.Session =
				await stripe.checkout.sessions.create(params)

			res.status(200).json(checkoutSession)
		} catch (err: any) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
