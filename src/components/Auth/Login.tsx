import { object, string, z } from 'zod'
import { Input } from '../ui/Input'
import Form, { useZodForm } from '~/components/ui/Form/Form'
import { Link } from '../ui/Link'

import { AuthLayout } from './AuthLayout'
import { Card } from '../ui/Card'

import FormSubmitButton from '../ui/Form/SubmitButton'
import useUser from '~/lib/useUser'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'

const LoginSchema = object({
	email: string().email(),
	password: string().min(6),
})

export function LoginForm() {
	const [isGuestLogin, setIsGuestLogin] = useState<boolean>(false)

	const { mutateUser } = useUser({
		redirectTo: '/products',
		redirectIfFound: true,
	})

	const form = useZodForm({
		schema: LoginSchema,
	})

	function handleGuestLogin() {
		form.setValue('email', 'root_user2@gmail.com')
		form.setValue('password', 'root_user')
	}

	async function handleSubmit(values: z.infer<typeof LoginSchema>) {
		const body = {
			email: values.email,
			password: values.password,
		}

		try {
			mutateUser(
				await fetchJson('/api/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
					credentials: 'include',
				})
			)
		} catch (error) {
			if (error instanceof FetchError) {
				toast.error(error.data.message)
			} else {
				toast.error("We are sorry but something isn't right. Please try again.")
			}
		}
	}

	return (
		<AuthLayout
			title="Sign In."
			subtitle="Welcome back! Sign in to your DogeMart account."
		>
			<Form
				form={form}
				onSubmit={async (values) => await handleSubmit(values)}
				className="w-full"
			>
				<Input
					label="Email"
					type="email"
					placeholder="Type your email here"
					autoComplete="email"
					autoFocus
					{...form.register('email')}
				/>

				<Input
					label="Password"
					type="password"
					placeholder="Type your password here"
					autoComplete="current-password"
					{...form.register('password')}
				/>

				<FormSubmitButton size="lg">Login</FormSubmitButton>
				<Button onClick={() => handleGuestLogin()} size="lg" variant="white">
					Login as Guest
				</Button>
			</Form>
			<div>
				<Card rounded="lg" className="mt-4">
					<Card.Body>
						<span className="mr-1">Don???t have an account yet ?</span>
						<Link
							className="font-medium text-brand-600 hover:text-brand-400"
							href="/auth/signup"
						>
							Register
						</Link>
					</Card.Body>
				</Card>
			</div>
		</AuthLayout>
	)
}
