import React from 'react'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Footer } from '../Common/Footer'
import { GradientBar } from '../ui/GradientBar'
import { Logo } from '../ui/Logo'
import { Patterns } from '../ui/Patterns'

interface Props {
	title: string
	subtitle: string
	children: React.ReactNode
}

export function AuthLayout({ title, subtitle, children }: Props) {
	return (
		<main className="flex flex-col justify-center mx-auto w-full max-w-xl min-h-screen py-10">
			<div className="hidden md:block absolute top-0 right-0 pt-2 mr-4">
				<Patterns />
			</div>
			<div className="mb-8 text-center">
				<div className="inline-flex items-center mb-1 space-x-3">
					<Logo className="hi-solid hi-cube-transparent inline-block w-10 h-10 text-brand-500" />
					<Heading size="h2">{title}</Heading>
				</div>
				<p className="mt-3 text-gray-500">{subtitle}</p>
			</div>
			<Card
				rounded="md"
				className="overflow-hidden sm:mx-auto sm:w-full sm:max-w-md"
			>
				<GradientBar color="indigo" />
				<Card.Body className="py-5">
					<div>{children}</div>
				</Card.Body>
			</Card>
			<Footer />
			<div className="hidden md:block absolute bottom-0 left-0 pb-2 ml-4">
				<Patterns />
			</div>
		</main>
	)
}
