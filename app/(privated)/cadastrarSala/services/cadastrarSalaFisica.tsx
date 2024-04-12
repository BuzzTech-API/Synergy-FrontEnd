'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { BACKEND_URL } from "@/app/constants";
import { getServerSession } from "next-auth"
/*
 * envia o body para cadastro do usuário no backend
 *
 * */
export async function cadastrarSala(body: {}) {

  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(body))
  
  const request = await fetch(BACKEND_URL + '/physicalrooms', {
    method: 'POST',
    headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ` + session?.backendTokens.access_token
		},
    body: JSON.stringify(body)
  })
  const response = request
  if(!response.ok) throw new Error
  return response.json()
}
