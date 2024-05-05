'use client'
import { BACKEND_URL } from "@/app/constants";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import getZoomToken from "./handleCode";

export default function ZoomAuthHandle() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')

  async function handleCode() {
    if (code) {
      try {
        const token = await getZoomToken(code)


        if (token.access_token !== undefined) {
          localStorage.setItem("zoom_token", token.access_token)
        }
        if (token.refresh_token !== undefined) {
          localStorage.setItem("zoom_refresh_token", token.refresh_token)
        }

      } catch (error) {

      } finally {
        router.replace("/agendar")
      }
    }
  }

  handleCode()



  return (
    <>
    </>
  )
}
