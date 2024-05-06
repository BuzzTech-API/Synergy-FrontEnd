"use server"
import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function getZoomToken(code: string) {

  const session = await getServerSession(authOptions)


  const zoomToken = await fetch(BACKEND_URL + "/zoom/token/" + code, {

    method: "POST",
    headers: {
      Authorization: `Bearer ` + session?.backendTokens.access_token
    },

  })

  return await zoomToken.json()
}
