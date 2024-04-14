


"use server"

import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export async function createGuest(body: {}) {

	const session = await getServerSession(authOptions)

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session?.backendTokens.access_token}`,
		},
		body: JSON.stringify(body)
	};



	const request = await fetch(BACKEND_URL + '/guests', options)
	if (!request.ok) {
		throw console.error(await request.text())
	}
	return await request.json()

}
interface participante {
	participante_nome: string,
	participante_email: string
}
export async function createGuests(participantesList: Array<participante>) {
	const guests = participantesList.map(async (participante) => {
		return await createGuest({
			"guest_name": participante.participante_nome,
			"guest_email": participante.participante_email,
		})
	})
	return await Promise.all(guests)
}
