'use server'
import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth"

/*
 * envia o body para cadastro do usuário no backend
 *
 * */
export async function cadastrarUsuario(body: {}) {
	const session = await getServerSession(authOptions);

	const request = await fetch(BACKEND_URL + '/users/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ` + session?.backendTokens.access_token
		},
		body: JSON.stringify(body)
	})
	const response = request
	if (!response.ok) throw new Error(await response.text())
	return response.json()
}
