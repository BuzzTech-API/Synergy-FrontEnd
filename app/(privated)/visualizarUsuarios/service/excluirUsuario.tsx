'use server'

import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth"

export async function excluirUsuario(user_id: number) {
    const session = await getServerSession(authOptions)

    const options = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ` + session?.backendTokens.access_token
        }
    }

    const request = await fetch(BACKEND_URL + '/users/' + user_id, options)

    if (!request.ok) throw new Error(await request.text())

    return request.json()
}