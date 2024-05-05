'use client'
import { BACKEND_URL } from "@/app/constants";
import { useSearchParams } from "next/navigation";
import getZoomToken from "./handleCode";

export default function ZoomAuthHandle() {
  const searchParams = useSearchParams()

  const code = searchParams.get('code')

  if (code) {
    const zoomToken = getZoomToken(code).then((response) => response.json).then(
      (response) => Promise.resolve(response.toString)
    )
    console.log(zoomToken);


  } else {
  }

  return (
    <>
    </>
  )
}
