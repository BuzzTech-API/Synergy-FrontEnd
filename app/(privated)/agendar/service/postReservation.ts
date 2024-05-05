"use server"

import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export async function createReservation(body: {}) {

    const session = await getServerSession(authOptions)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.backendTokens.access_token}`,
        },
        body: JSON.stringify(body)
    };


    const request = await fetch(BACKEND_URL + '/reservations/physicalroom', options)
    if (!request.ok) {
        throw console.error(await request.text())
    }
    return await request.json()

}

export async function createReservationVirtual(body: {}) {

    const session = await getServerSession(authOptions)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.backendTokens.access_token}`,
        },
        body: JSON.stringify(body)
    };


    const request = await fetch(BACKEND_URL + '/reservations/virtualroom', options)
    if (!request.ok) {
        throw console.error(await request.text())
    }
    return await request.json()

}

export async function createReservationHibrid(body: {}) {

    const session = await getServerSession(authOptions)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.backendTokens.access_token}`,
        },
        body: JSON.stringify(body)
    };


    const request = await fetch(BACKEND_URL + '/reservations/hibrid', options)
    if (!request.ok) {
        throw console.error(await request.text())
    }
    return await request.json()

}
