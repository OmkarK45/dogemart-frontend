import { NextApiRequest, NextApiResponse } from 'next'

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
		try {
			// Validate the cart details that were sent from the client.
			const cartItems = req.body
			const line_items = cartItems
			// Create Checkout Sessions from body params.
			const params: Stripe.Checkout.SessionCreateParams = {
				submit_type: 'pay',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_address_collection: {
					allowed_countries: ['US', 'CA', 'IN', 'GB', 'AU'],
				},
				line_items,
				success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/use-shopping-cart`,
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