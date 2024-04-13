'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { BACKEND_URL } from "@/app/constants";
import { getServerSession } from "next-auth"


export async function GetSalasService() {
	const session = await getServerSession(authOptions);

	const request = await fetch(BACKEND_URL + '/physicalrooms/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ` + session?.backendTokens.access_token
		}
	})
	const response = request
	if (!response.ok) {
		throw new Error
	}

	return response.json()
}

export async function GetReservationSalaService(id:number) {
	
	const session = await getServerSession(authOptions);

	const request = await fetch(BACKEND_URL + `/physicalrooms/${id}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ` + session?.backendTokens.access_token
		}
	})
	const response = request
	if (!response.ok) {
		throw new Error
	}

	return response.json()
}