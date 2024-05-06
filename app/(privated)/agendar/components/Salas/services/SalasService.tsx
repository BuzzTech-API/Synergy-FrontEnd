'use server'
import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
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

export async function GetReservationSalaService(id: number) {

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

export async function GetSalasVirtuaisService() {
	const session = await getServerSession(authOptions);

	const request = await fetch(BACKEND_URL + '/virtualrooms/', {
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

