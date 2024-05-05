import { BACKEND_URL } from "@/app/constants";

export default async function getZoomToken(code: string) {
  const zoomToken = await fetch(BACKEND_URL + "/zoom/token", {

    method: "POST",
    body: JSON.stringify({
      code
    })
  })
  return zoomToken
}
