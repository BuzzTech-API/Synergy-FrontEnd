'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

/*
 * envia o body para cadastro do usuário no backend
 *
 * */
export async function cadastrarUsuario(body: {}) {
	const session = await getServerSession(authOptions);

	const request = await fetch('http://localhost:5000/users', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ` + session?.backendTokens.access_token
		},
		body: JSON.stringify(body)
	})
	const response = request
	if (!response.ok) {
		throw new Error
	}
	return response.json()
}
