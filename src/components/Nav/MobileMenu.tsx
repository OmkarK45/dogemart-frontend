import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import {
	HiOutlineHeart,
	HiOutlineHome,
	HiOutlineLogout,
	HiOutlineShoppingCart,
} from 'react-icons/hi'

import useUser from '~/lib/useUser'

import { Heading } from '../ui/Heading'
import { Link } from '../ui/Link'
import { Logo } from '../ui/Logo'
import { MegaMenuMobile } from './MegaMenuMobile'

const navItems = [
	{
		label: 'Explore Products',
		href: '/products',
		icon: <HiOutlineHome className="w-5 h-5" />,
	},
	{
		label: 'My Cart',
		href: '/cart',
		icon: <HiOutlineShoppingCart className="w-5 h-5" />,
	},
	{
		label: 'My Wishlist',
		href: '/wishlist',
		icon: <HiOutlineHeart className="w-5 h-5" />,
	},
]

export function MobileMenu({
	open,
	setOpen,
}: {
	open: boolean
	setOpen: (open: boolean) => void
}) {
	const { user } = useUser({
		redirectIfFound: false,
	})

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 flex z-40 lg:hidden"
				onClose={setOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter="transition ease-in-out duration-300 transform"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
						<div className="px-4 pt-5 pb-2 flex">
							<button
								type="button"
								className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
								onClick={() => setOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>

						{/* Links */}
						<div className="flex items-center space-x-2 pb-4 px-2">
							<Logo className="h-10 w-10 text-brand-600" />
							<Heading className="not-italic" size="h4">
								DogeMart
							</Heading>
						</div>
						<div className="border-t border-gray-200 py-6 px-4 space-y-6">
							{user?.isLoggedIn ? (
								<div>
									<p className="font-medium capitalize text-base border-b border-gray-200 pb-2">
										Hi, {user.data.user?.name}!
									</p>
								</div>
							) : (
								<>
									<div className="flow-root">
										<Link
											href="/auth/signup"
											className="-m-2 p-2 block font-medium text-gray-900 no-underline"
										>
											Create an account
										</Link>
									</div>
									<div className="flow-root">
										<Link
											href="/auth/login"
											className="-m-2 p-2 block font-medium text-gray-900 no-underline"
										>
											Sign in
										</Link>
									</div>
								</>
							)}

							{navItems.map((item) => (
								<div className="flow-root" key={item.label}>
									<Link
										href={item.href}
										className="-m-2 p-2 block font-medium text-gray-900 no-underline"
									>
										<span className="flex items-center space-x-3">
											{item.icon} <p>{item.label}</p>
										</span>
									</Link>
								</div>
							))}
							<div className="flow-root">
								<button
									onClick={() => console.log('logout')}
									className="-m-2 p-2 w-full block font-medium text-gray-900 no-underline"
								>
									<span className="flex items-center space-x-3">
										<HiOutlineLogout className="w-5 h-5" />
										<p>Signout</p>
									</span>
								</button>
							</div>
							<MegaMenuMobile />
						</div>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	)
}
