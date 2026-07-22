import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({
  region: process.env.WAMEED_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.WAMEED_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.WAMEED_AWS_SECRET_ACCESS_KEY || '',
  },
})

const FROM = 'Wameed Tech Website <noreply@wameedtech.com>'

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<void> {
  await ses.send(
    new SendEmailCommand({
      Source: FROM,
      Destination: { ToAddresses: [opts.to] },
      ReplyToAddresses: opts.replyTo ? [opts.replyTo] : undefined,
      Message: {
        Subject: { Data: opts.subject, Charset: 'UTF-8' },
        Body: { Html: { Charset: 'UTF-8', Data: opts.html } },
      },
    })
  )
}
