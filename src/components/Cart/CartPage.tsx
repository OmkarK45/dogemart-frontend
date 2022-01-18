import { getISODay } from 'date-fns'
import { useState } from 'react'
import useSWR from 'swr'
import { fetchPostJSON } from '~/lib/api-helpers'
import { CURRENCY } from '~/lib/config'
import { fetcher } from '~/lib/fetchJson'
import getStripe from '~/lib/get-stripe'
import { calculateOriginalPrice } from '~/lib/price'
import { formatAmountForStripe } from '~/lib/stripe-helpers'
import { CartItems } from '~/types'
import { Alert } from '../ui/Alert'
import { Button } from '../ui/Button'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { Heading } from '../ui/Heading'
import { Link } from '../ui/Link'
import { Spinner } from '../ui/Spinner'
import { CartItem } from './CartItem'
import { PriceElement } from './PriceElement'

export function Cart({ cartItems }: { cartItems: CartItems }) {
	const [quantity, setQuantity] = useState(1)
	const [loading, setLoading] = useState(false)

	const { data: cartItemsData, error } = useSWR<CartItems>(
		'/api/cart',
		fetcher,
		{ fallbackData: cartItems }
	)

	if (!cartItemsData) {
		return <LoadingFallback />
	}

	function getSubtotal(cartItems: CartItems) {
		return cartItems.reduce((total, item) => {
			return (
				total +
				parseFloat(
					calculateOriginalPrice(item.product.price, item.product.discount)
				) *
					quantity
			)
		}, 0)
	}

	async function handlePayment(e: any, cartItemsData: CartItems) {
		if (cartItemsData.length === 0) {
			return
		}
		e.preventDefault()
		setLoading(true)
		// Create a Checkout Session.
		const response = await fetchPostJSON('/api/checkout_sessions', {
			amount: parseInt(getSubtotal(cartItemsData).toFixed(4)),
			line_items: cartItemsData.map((item) => ({
				name: item.product.title,
				description: item.product.description.substring(0, 100) + '...',
				images: item.product.images,
				amount: formatAmountForStripe(
					parseInt(
						calculateOriginalPrice(item.product.price, item.product.discount)
					),
					CURRENCY
				),
				currency: CURRENCY,
				quantity: quantity,
			})),
		})

		if (response.statusCode === 500) {
			console.error(response.message)
			return
		}

		// Redirect to Checkout.
		const stripe = await getStripe()
		const { error } = await stripe!.redirectToCheckout({
			// Make the id field from the Checkout Session creation API response
			// available to this file, so you can provide it as parameter here
			// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
			sessionId: response.id,
		})
		// If `redirectToCheckout` fails due to a browser or network
		// error, display the localized error message to your customer
		// using `error.message`.
		console.warn(error.message)
	}

	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-2xl mx-auto  px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="sticky top-0 py-6 min-w-full bg-white z-10">
					<Heading size="h3">Shopping Cart ({cartItemsData.length})</Heading>
				</div>
				<form className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
					<section aria-labelledby="cart-heading" className="lg:col-span-7">
						<ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
							{cartItemsData.length === 0 && (
								<ErrorFallback
									noAction
									buttonText="Take me to shop."
									message="Your cart is empty!"
								/>
							)}
							{cartItemsData.map((product, productIdx) => (
								<CartItem
									item={product}
									key={productIdx}
									productIdx={productIdx}
									setQuantity={setQuantity}
								/>
							))}
						</ul>
					</section>
					{/* Order summary */}

					<section className="mt-16 sticky top-20 w-full bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
						<div className="mb-5">
							<Alert
								status="info"
								message="This checkout flow is for demonstration purpose only. Please do not enter real banking details. Use 4242 4242 4242 4242 for card number, 04/24 for expiry date and 424 as CVV."
							/>
						</div>
						<h2
							id="summary-heading"
							className="text-lg font-medium text-gray-900"
						>
							Order summary
						</h2>
						<dl className="mt-6 space-y-4">
							<PriceElement
								price={parseInt(getSubtotal(cartItemsData).toFixed(2))}
								type="subtotal"
							/>
							<PriceElement price={'FREE'} type="shipping" />
							<PriceElement price={'FREE'} type="tax" />
							<PriceElement
								price={parseInt(getSubtotal(cartItemsData).toFixed(2))}
								type="total"
							/>
						</dl>
						<div className="mt-6">
							<Button
								onClick={(e) => handlePayment(e, cartItemsData)}
								size="xl"
								fullWidth
								disabled={cartItemsData.length === 0 || loading}
							>
								Pay ₹ {parseInt(getSubtotal(cartItemsData).toFixed(2))}
								{loading && <Spinner className="w-5 h-5 ml-3" />}
							</Button>
							<small>Powered by Stripe</small>
						</div>
						<div className="flex items-center justify-center mt-6">
							<Link href="/products">Continue Shopping</Link>
						</div>
					</section>
				</form>
			</div>
		</div>
	)
}
