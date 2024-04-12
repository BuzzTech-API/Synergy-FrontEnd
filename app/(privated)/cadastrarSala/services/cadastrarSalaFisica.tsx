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
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + session?.backendTokens.access_token);
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const request = await fetch(BACKEND_URL + '/physicalrooms', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
  const response = request
  return response.json()
}
