"use server"

import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export async function createMeetingUsers(body: {}) {

	const session = await getServerSession(authOptions)

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session?.backendTokens.access_token}`,
		},
		body: JSON.stringify(body)
	};



	const request = await fetch(BACKEND_URL + '/meetings/users', options)
	if (!request.ok) {
		throw console.error(await request.text())
	}

}
