import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Alert } from '~/components/ui/Alert'
import { Button } from '~/components/ui/Button'
import { fetchGetJSON } from '~/lib/api-helpers'
import { mutationFn } from '~/lib/fetchJson'

export default function ThankYouPage() {
	const router = useRouter()

	const { data, error } = useSWR(
		router.query.session_id
			? `/api/checkout_sessions/${router.query.session_id}`
			: null,
		fetchGetJSON
	)

	if (data?.payment_intent?.status === 'succeeded') {
		mutationFn('/api/cart/clear-cart', {})
	}

	if (error) return <div>failed to load</div>

	return (
		<div className="min-h-screen bg-white">
			<main className=" px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
				<div className="max-w-3xl mx-auto">
					<div className="max-w-xl">
						<div className="mb-4">
							<Alert status="success" message="Payment successful." />
						</div>
						<h1 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
							Thank you!
						</h1>
						<p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
							It&apos;s on the way!
						</p>
						<p className="mt-2 text-base text-gray-500">
							Thank you for shopping at DogeMart.
						</p>
					</div>
					<Button className="mt-7" href="/">
						Continue Shopping
					</Button>
				</div>
			</main>
		</div>
	)
}
