import { HiOutlineArrowRight } from 'react-icons/hi'
import { Button } from '../ui/Button'

export function HeroSection() {
	return (
		<div className="relative bg-white overflow-hidden min-h-screen">
			<div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
					<div className="sm:max-w-lg">
						<h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
							Shop what the world loves.
						</h1>
						<p className="mt-4 text-xl text-gray-500">
							We are introducing brand new series of products that will blow
							your mind! Checkout our latest products now.
						</p>
					</div>
					<div>
						<div className="mt-10">
							{/* Decorative image grid */}
							<div
								aria-hidden="true"
								className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
							>
								<div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
									<div className="flex items-center space-x-6 lg:space-x-8">
										<div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
											<div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
												<img
													src="https://images.asos-media.com/products/dr-denim-cadell-cropped-loose-fit-jeans-in-purple/200318832-1-deeppurplecord"
													alt=""
													className="w-full h-full object-center object-cover"
												/>
											</div>
											<div className="w-44 h-64 rounded-lg overflow-hidden">
												<img
													src="https://images.asos-media.com/products/asos-design-oversized-t-shirt-dress-with-frill-hem-in-rose/22707646-1-rose?$n_750w$&wid=750&fit=constrain"
													alt=""
													className="w-full h-full object-center object-cover"
												/>
											</div>
										</div>
										<div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
											<div className="w-44 h-64 rounded-lg overflow-hidden">
												<img
													src="https://images.asos-media.com/products/asos-design-long-sleeve-wrap-top-in-white/200259444-1-white"
													alt=""
													className="w-full h-full object-center object-cover"
												/>
											</div>
											<div className="w-44 h-64 rounded-lg overflow-hidden">
												<img
													src="https://images.asos-media.com/products/urbancode-faux-leather-racer-jacket-in-black/200870523-1-black"
													alt=""
													className="w-full h-full object-center object-cover"
												/>
											</div>
											<div className="w-44 h-64 rounded-lg overflow-hidden">
												<img
													src="https://images.asos-media.com/products/french-connection-slim-fit-jeans-in-mid-blue/22234606-1-blue"
													alt=""
													className="w-full h-full object-center object-cover"
												/>
											</div>
										</div>
										<div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
											<div className="w-44 h-64 rounded-lg overflow-hidden">
												<img
													src="https://images.asos-media.com/products/wrangler-bryson-skinny-fit-jeans/23914382-1-blue"
													alt=""
													className="w-full h-full object-center object-cover"
												/>
											</div>
											<div className="w-44 h-64 rounded-lg overflow-hidden">
												<img
													src="https://images.asos-media.com/products/muubaa-collar-detail-leather-jacket-in-black/201093663-1-black"
													alt=""
													className="w-full h-full object-center object-cover"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							<Button
								size="xl"
								href="/products"
								className="transform transition duration-300  md:hover:scale-125 hover:shadow-lg active:scale-95  active:shadow-none"
							>
								<span className="flex items-center space-x-2">
									<p>Shop Collection</p>
									<HiOutlineArrowRight />
								</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
