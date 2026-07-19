import { NextRequest, NextResponse } from 'next/server'

// This API route will be replaced with AWS Lambda when deployed
// For now, we'll create a placeholder that logs the submission

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Send to AWS Lambda/SES
    // This will be configured during deployment
    console.log('Form submission:', { name, email, message })

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
