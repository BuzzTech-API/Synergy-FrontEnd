export interface mailRecipient{
    name: string,
    address: string
}

export type sendEmailProps = {
    recipients: Array<mailRecipient>,
    subject: string,
    html: string,
}