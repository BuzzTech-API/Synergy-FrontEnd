'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { BACKEND_URL } from "@/app/constants"
import { getServerSession } from "next-auth"

export async function getAllUsers() {
  const session = await getServerSession(authOptions)
  const response = await fetch(BACKEND_URL + "/users",
    {
      headers: {
        'Authorization': `Bearer ${session?.backendTokens.access_token}`
      }
    }
  )
  if (!response.ok)
    throw console.error(response.text);

  return response.json()


}
