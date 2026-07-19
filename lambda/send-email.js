/**
 * AWS Lambda Function for Sending Emails via SES
 *
 * This function processes contact form submissions and sends emails
 * using AWS Simple Email Service (SES).
 *
 * Setup Instructions:
 * 1. Create new Lambda function in AWS Console
 * 2. Runtime: Node.js 20.x
 * 3. Copy this code into the function
 * 4. Add SES permissions to the Lambda role
 * 5. Set up API Gateway to trigger this function
 * 6. Update the frontend API route to call this Lambda endpoint
 */

const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Email to send to Info@wameedtech.com
    const adminEmailParams = {
      Source: 'noreply@wameedtech.com',
      Destination: {
        ToAddresses: ['Info@wameedtech.com'],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                  <h2>New Contact Form Submission</h2>
                  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background-color: #f5f5f5; padding: 10px; border-left: 3px solid #2FD4C4;">
                    ${escapeHtml(message).replace(/\n/g, '<br/>')}
                  </p>
                  <hr/>
                  <p style="color: #888; font-size: 12px;">
                    This message was sent from wameedtech.com contact form.
                  </p>
                </body>
              </html>
            `,
            Charset: 'UTF-8',
          },
        },
      },
    };

    // Confirmation email to sender
    const userEmailParams = {
      Source: 'noreply@wameedtech.com',
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: 'Thank you for contacting Wameed Tech',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                  <h2>Thank you, ${escapeHtml(name)}!</h2>
                  <p>We received your message and appreciate you reaching out to Wameed Tech.</p>
                  <p>Our team will review your inquiry and get back to you as soon as possible.</p>
                  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;"/>
                  <p style="color: #888; font-size: 12px;">
                    <strong>Wameed Tech</strong><br/>
                    Web & App Development Studio<br/>
                    Amman, Jordan<br/>
                    <a href="mailto:Info@wameedtech.com">Info@wameedtech.com</a> |
                    <a href="tel:+962786277768">+962 78 627 7768</a>
                  </p>
                </body>
              </html>
            `,
            Charset: 'UTF-8',
          },
        },
      },
    };

    // Send both emails in parallel
    await Promise.all([
      ses.sendEmail(adminEmailParams).promise(),
      ses.sendEmail(userEmailParams).promise(),
    ]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS
      },
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message,
      }),
    };
  }
};

// Helper function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
