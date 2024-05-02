'use server'
import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth"
/*
 * envia o body para cadastro do usuário no backend
 *
 * */
export async function cadastrarSalaVirtual(body: {}) {
  const session = await getServerSession(authOptions)

  const request = await fetch(BACKEND_URL + '/virtualrooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + session?.backendTokens.access_token
    },
    body: JSON.stringify(body)
  })


  const response = request
  if (!response.ok) throw new Error(await response.text())
  return response.json()
}
