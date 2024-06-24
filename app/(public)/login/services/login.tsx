import { BACKEND_URL } from "@/app/constants"

export default async function logar(body: { user_email: string, user_password: string }) {

	const requisition = fetch(BACKEND_URL + '/auth/login', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body)
	})
	const response = await requisition
	if (!response.ok) {
		throw new Error
	}
	return { status: response.status, resposta: await response.json() }
}

