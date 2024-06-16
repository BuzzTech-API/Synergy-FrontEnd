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

        if (typeof window !== "undefined") {

          if (token.access_token !== undefined) {
            localStorage.setItem("zoom_access_token", token.access_token)
          }
          if (token.refresh_token !== undefined) {
            localStorage.setItem("zoom_refresh_token", token.refresh_token)
          }

          // Obter a data atual
          const currentDate = new Date();
          // Calcular a data de expiração
          const expirationDate = new Date(currentDate.getTime() + token.expires_in * 1000);

          // Converter a data de expiração para timestamp em segundos
          const expirationTimestamp = Math.floor(expirationDate.getTime() / 1000);



          // Salvar o timestamp de expiração no localStorage
          localStorage.setItem('expirationTimestamp', expirationTimestamp.toString());
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
