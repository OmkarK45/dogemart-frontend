type PriceType =
	| 'total'
	| 'subtotal'
	| 'tax'
	| 'shipping'
	| 'discount'
	| 'coupon'
	| 'fee'
	| 'refund'

export function PriceElement({
	type,
	price,
}: {
	type: PriceType
	price: number | string
}) {
	return (
		<div className="border-t border-gray-200 pt-4 flex items-center justify-between">
			<dt className="flex text-sm text-gray-600">
				<span className="capitalize">{type}</span>
			</dt>
			<dd className="text-sm font-medium text-gray-900">
				{' '}
				{price !== 'FREE' && '₹'}
				{price}
			</dd>
		</div>
	)
}
