"use server"

import { BACKEND_URL } from "@/app/constants";
import { sendEmailProps } from "@/app/type/emailTypes";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";


export async function sendEmail(sendEmail: sendEmailProps) {
    const session = await getServerSession(authOptions);
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.backendTokens.access_token}`,
      },
      body: JSON.stringify(sendEmail)
    };
  
    const request = await fetch(`${BACKEND_URL}/mailer`, options);
    
  
    if (!request.ok) {
      throw new Error(await request.text());
    }

    return await request.json();  
  }