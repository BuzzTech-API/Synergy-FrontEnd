export default async function logar(body: { user_email: string, user_password: string }) {

	const requisition = fetch('http://localhost:5000/auth/login', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body)
	})
	const response = await requisition
	return { status: response.status, resposta: await response.json() }
}

