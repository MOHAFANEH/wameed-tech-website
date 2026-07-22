import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, escapeHtml } from '@/lib/ses'

export async function POST(req: NextRequest) {
  try {
    const TO = process.env.CONTACT_INBOX
    if (!TO) {
      throw new Error('CONTACT_INBOX environment variable is not set')
    }

    const { name, email, phone, projectType, budget, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (
      name.length > 200 ||
      email.length > 320 ||
      message.length > 5000 ||
      (phone && phone.length > 30) ||
      (projectType && projectType.length > 50) ||
      (budget && budget.length > 50)
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }

    await sendEmail({
      to: TO,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2E2560, #4B3F9E); color: #fff; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; color: #fff;">New Contact Form Submission</h2>
            <p style="margin: 4px 0 0; color: #2FD4C4;">wameedtech.com</p>
          </div>
          <div style="background: #F7F6FB; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e2f0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            ${phone ? `<p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone)}</p>` : ''}
            ${projectType ? `<p><strong>What they need:</strong> ${escapeHtml(projectType)}</p>` : ''}
            ${budget ? `<p><strong>Budget range:</strong> ${escapeHtml(budget)}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background: #fff; padding: 16px; border-left: 4px solid #2FD4C4; border-radius: 4px;">
              ${escapeHtml(message).replace(/\n/g, '<br/>')}
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 24px;">
              Reply directly to this email to answer ${escapeHtml(name)}.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('SES error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
