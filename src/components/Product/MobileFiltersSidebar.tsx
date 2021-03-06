import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon, XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { FilterProps, filters } from './DesktopFiltersSidebar'

interface MobileFiltersSidebarProps extends FilterProps {
	open: boolean
	setOpen: (open: boolean) => void
}

export function MobileFiltersSidebar({
	open,
	setOpen,
	categoryFilter,
	colorFilter,
	sizeFilter,
	setCategoryFilter,
	setColorFilter,
	setSizeFilter,
}: MobileFiltersSidebarProps) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value, checked } = e.target
		if (name === 'size') {
			if (checked) {
				setSizeFilter([...sizeFilter, value])
			} else {
				setSizeFilter(sizeFilter.filter((item) => item !== value))
			}
		} else if (name === 'color') {
			if (checked) {
				setColorFilter([...colorFilter, value])
			} else {
				setColorFilter(colorFilter.filter((item) => item !== value))
			}
		} else if (name === 'category') {
			if (checked) {
				setCategoryFilter([...categoryFilter, value])
			} else {
				setCategoryFilter(categoryFilter.filter((item) => item !== value))
			}
		}
	}

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
					enterFrom="translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="translate-x-full"
				>
					<div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
						<div className="px-4 flex items-center justify-between">
							<h2 className="text-lg font-medium text-gray-900">Filters</h2>
							<button
								type="button"
								className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
								onClick={() => setOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>

						{/* Filters */}
						<form className="mt-4 border-t border-gray-200">
							{filters.map((section) => (
								<Disclosure
									as="div"
									key={section.id}
									className="border-t border-gray-200 px-4 py-6"
								>
									{({ open }) => (
										<>
											<h3 className="-mx-2 -my-3 flow-root">
												<Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
													<span className="font-medium text-gray-900">
														{section.name}
													</span>
													<span className="ml-6 flex items-center">
														{open ? (
															<MinusSmIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														) : (
															<PlusSmIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														)}
													</span>
												</Disclosure.Button>
											</h3>
											<Disclosure.Panel className="pt-6">
												<div className="space-y-6">
													{section.options.map((option, optionIdx) => (
														<div
															key={option.value}
															className="flex items-center"
														>
															<input
																id={`filter-mobile-${section.id}-${optionIdx}`}
																name={`${section.id}`}
																defaultValue={option.value}
																type="checkbox"
																onChange={handleChange}
																className="h-4 w-4 border-gray-300 rounded text-brand-600 focus:ring-brand-500"
															/>
															<label
																htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																className="ml-3 min-w-0 flex-1 text-gray-500"
															>
																{option.label}
															</label>
														</div>
													))}
												</div>
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							))}
						</form>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	)
}
