'use server'
import { BACKEND_URL } from "@/app/constants"
import { authOptions } from "@/app/utils/authOptions"
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
