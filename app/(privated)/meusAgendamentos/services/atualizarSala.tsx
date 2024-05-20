import { BACKEND_URL } from "@/app/constants";
import { UpdatePhysicalRoom } from "@/app/type/rooms";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth"


export async function atualizarSala(salaFisicaBody: UpdatePhysicalRoom) {
    const session = await getServerSession(authOptions)

    const options = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ` + session?.backendTokens.access_token
        },
        body: JSON.stringify(salaFisicaBody)
    }

    const request = await fetch(BACKEND_URL + '/physicalrooms', options)

    if (!request.ok) throw new Error(await request.text())

    return request.json()
}