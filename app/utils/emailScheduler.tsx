import { BACKEND_URL } from "@/app/constants";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { sendEmailProps } from "../type/emailTypes";


export async function sendEmailScheduled(emailInfos: sendEmailProps, date: string) {

    const schedulerEmailProps = {
        date: date,
        mailOptions: emailInfos
    }

    const session = await getServerSession(authOptions);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.backendTokens.access_token}`,
        },
        body: JSON.stringify(schedulerEmailProps)
    };

    const request = await fetch(`${BACKEND_URL}/mailer/schedule`, options);


    if (!request.ok) {
        throw new Error(await request.text());
    }

    return await request.json();
}