"use server"

import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export async function getParticipacoes(meeting_id: number) {
    const session = await getServerSession(authOptions);
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.backendTokens.access_token}`,
      },
    };
  
    const request = await fetch(`${BACKEND_URL}/meetings/participate/${meeting_id}`, options);
  
    if (!request.ok) {
      throw new Error(await request.text());
    }
  
    return await request.json();
  }