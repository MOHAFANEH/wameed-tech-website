# Wameed Tech Website

Professional web and mobile app development studio website built with Next.js, React, and Tailwind CSS.

## Features

- ✅ Bilingual Support (English LTR / Arabic RTL)
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Contact Form with Email Integration
- ✅ Portfolio/Clients Section
- ✅ About Us Section
- ✅ SEO Optimized
- ✅ Dark/Light Mode Ready
- ✅ AWS SES Integration

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel or Netlify
- **Email Service:** AWS SES

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wameed-tech-website
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file:

```env
# AWS SES Configuration (set during deployment)
NEXT_PUBLIC_AWS_REGION=us-east-1
AWS_SES_ACCESS_KEY_ID=your_access_key
AWS_SES_SECRET_ACCESS_KEY=your_secret_key
```

## Project Structure

```
wameed-tech-website/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── api/
│       └── send-email/      # Email API route
├── components/
│   ├── Navigation.tsx       # Header with language toggle
│   ├── Hero.tsx             # Hero section
│   ├── Services.tsx         # About & services
│   ├── Clients.tsx          # Portfolio section
│   ├── CTA.tsx              # Contact form
│   └── Footer.tsx           # Footer
├── public/                  # Static assets
└── package.json
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables
5. Deploy!

```bash
vercel
```

### Option 2: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your GitHub repository
4. Set environment variables
5. Deploy!

## AWS SES Setup

To enable email sending:

1. Set up SES in AWS Console (already done)
2. Get SES credentials (Access Key, Secret Key)
3. Create AWS Lambda function for sending emails
4. Update API route to call Lambda

Lambda function code will be provided separately.

## Customization

### Colors

Edit the Tailwind config in `tailwind.config.js`:

```js
colors: {
  brand: {
    deep: '#2E2560',
    indigo: '#4B3F9E',
    lilac: '#8B7FE8',
    teal: '#2FD4C4',
    bg: '#F7F6FB',
    ink: '#1A1730',
  },
}
```

### Content

Update text content in component files:
- `Hero.tsx` - Hero section text
- `Services.tsx` - About & services text
- `Clients.tsx` - Projects/clients list
- `CTA.tsx` - Contact form labels

### Add Your Logo

Replace the omega (ω) symbol in Navigation.tsx and Footer.tsx with your logo image.

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Form not sending emails?**
- Check AWS SES credentials
- Verify domain is verified in SES
- Check Lambda function is deployed

**Language toggle not working?**
- Clear browser cache
- Check browser console for errors

**Styling issues?**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`

## Support

For issues or questions, contact: Info@wameedtech.com

## License

© 2026 Wameed Tech. All rights reserved.
