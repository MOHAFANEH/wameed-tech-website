# Deployment Guide for Wameed Tech Website

Complete step-by-step guide to deploy the website with AWS SES email integration.

## Prerequisites

- GitHub account with the repository pushed
- AWS account with SES verified domain
- Vercel or Netlify account
- Domain: wameedtech.com (already migrated to Route 53)

## Step 1: Deploy to Vercel

### 1.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Import"

### 1.2 Configure Environment Variables

In the Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add these variables:

```
NEXT_PUBLIC_SITE_URL=https://wameedtech.com
NEXT_PUBLIC_AWS_REGION=us-east-1
AWS_LAMBDA_ENDPOINT=https://your-lambda-url.execute-api.us-east-1.amazonaws.com/prod
```

### 1.3 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site is live at `https://your-project.vercel.app`

### 1.4 Connect Custom Domain

1. In Vercel, go to Settings → Domains
2. Add custom domain: `wameedtech.com`
3. Vercel will give you DNS records to add

### 1.5 Update Route 53 DNS

1. Go to AWS Route 53 console
2. Select your `wameedtech.com` hosted zone
3. Add the CNAME record from Vercel:
   - Name: `www.wameedtech.com`
   - Type: CNAME
   - Value: `cname.vercel-dns.com`

4. For root domain (`wameedtech.com`), add an A record:
   - Name: `wameedtech.com`
   - Type: A
   - Value: `76.76.19.21` (Vercel's IP)

5. Wait for DNS propagation (5-30 minutes)

---

## Step 2: Deploy AWS Lambda Function

### 2.1 Create Lambda Function

1. Go to AWS Lambda Console
2. Click "Create function"
3. Fill in:
   - **Name:** `wameed-tech-send-email`
   - **Runtime:** Node.js 20.x
   - **Role:** Create new role with basic Lambda permissions

4. Click "Create function"

### 2.2 Add SES Permissions

1. In Lambda, go to "Configuration" → "Permissions"
2. Click the Role name to open IAM
3. Click "Add inline policy"
4. Use this JSON policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

5. Click "Create policy"

### 2.3 Add Lambda Code

1. In Lambda function, copy the code from `lambda/send-email.js`
2. Paste into the editor
3. Click "Deploy"

### 2.4 Create API Gateway Trigger

1. In Lambda, click "Add trigger"
2. Select "API Gateway"
3. Click "Create new API"
4. Configure:
   - **API:** HTTP API
   - **CORS:** Enable
   - **Authorization:** None

5. Click "Add"
6. Copy the API endpoint URL

### 2.5 Update Frontend API Route

Update `app/api/send-email/route.ts`:

```typescript
export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Call Lambda function
    const response = await fetch(
      'https://your-lambda-url.execute-api.us-east-1.amazonaws.com/prod',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )
    
    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---

## Step 3: Email Configuration

### 3.1 Verify Sender Email in SES

1. Go to AWS SES Console (US East N. Virginia)
2. Go to "Verified Identities"
3. Click "Create Identity"
4. Add: `noreply@wameedtech.com`
5. Verify the email (click link in verification email)

### 3.2 Test Email Sending

1. Go to Lambda → Test
2. Use this test event:

```json
{
  "body": "{\"name\":\"Test User\",\"email\":\"your@email.com\",\"message\":\"Test message\"}"
}
```

3. Click "Test"
4. Check your inbox for emails

---

## Step 4: DNS Records Summary

Your Route 53 should have these records:

| Name | Type | Value | TTL |
|------|------|-------|-----|
| wameedtech.com | A | 76.76.19.21 | 3600 |
| wameedtech.com | MX | 10 mx.wameedtech.com (for Gmail forwarding) | 3600 |
| wameedtech.com | TXT | DKIM records from SES | Auto |
| www.wameedtech.com | CNAME | cname.vercel-dns.com | 3600 |
| noreply | CNAME | wameedtech.com | Auto |

---

## Step 5: Production Checklist

- [ ] Website deployed and live at wameedtech.com
- [ ] Domain DNS configured in Route 53
- [ ] SES emails verified (domain + noreply@wameedtech.com)
- [ ] Lambda function created and tested
- [ ] API Gateway endpoint configured
- [ ] Frontend API route updated with Lambda endpoint
- [ ] Contact form tested end-to-end
- [ ] Emails send to Info@wameedtech.com
- [ ] Confirmation emails sent to users
- [ ] Gmail forwarding set up to receive emails
- [ ] SSL certificate active (auto via Vercel)

---

## Troubleshooting

### Emails not sending?

1. Check SES status (must be out of sandbox)
2. Verify sender email in SES
3. Check Lambda logs in CloudWatch
4. Verify IAM role has SES permissions
5. Check API Gateway CORS settings

### Domain not resolving?

1. Check Route 53 records
2. Wait for DNS propagation (can take 24-48 hours)
3. Verify nameservers point to Route 53
4. Use `nslookup wameedtech.com` to check

### Form not submitting?

1. Check browser console for errors
2. Verify API endpoint in code
3. Check CORS settings on API Gateway
4. Test Lambda function directly

---

## Next Steps

1. Monitor SES usage in CloudWatch
2. Set up CloudWatch alarms for Lambda errors
3. Add analytics (Google Analytics, Vercel Analytics)
4. Set up SSL monitoring
5. Regular backups of website code
6. Monitor email bounces/complaints in SES

---

## Support

For issues: Info@wameedtech.com
