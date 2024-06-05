'use server'
import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth"
/*
 * envia o body para edição da sala no backend
 *
 * */
export async function editarSalaVirtual(body: {}) {
  const session = await getServerSession(authOptions)

try{
  const request = await fetch(BACKEND_URL + '/virtualrooms', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + session?.backendTokens.access_token
    },
    body: JSON.stringify(body)
  })

  if (!request.ok) {
    const errorText = await request.text();
    console.error("Request failed:", request.status, errorText);
    throw new Error(errorText);
  }
  return await request.json();
  } catch (error) {
    console.error("Error in editarSalaPresencial:", error);
    throw error;
  }
}