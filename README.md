# Sumanth Minerals Web Application

A premium, production-ready B2B industrial web application for Sumanth Minerals, built with Next.js.

## Tech Stack
- **Frontend:** Next.js 14 (App Router, JavaScript)
- **Styling:** Vanilla CSS (CSS Modules)
- **Backend:** Next.js API Routes
- **Database:** MongoDB (via Mongoose)
- **Icons:** Lucide React
- **Email:** Nodemailer

## Deployment Steps

### 1. Database Setup
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Get your connection string and add it to `.env.local`.

### 2. Email Configuration
- Use a service like Gmail with an "App Password" or a professional SMTP service (SendGrid, Mailgun).
- Add credentials to `.env.local`.

### 3. Deploy Frontend (Vercel)
- Push code to GitHub.
- Import project to [Vercel](https://vercel.com).
- Add Environment Variables in Vercel Dashboard.

### 4. Domain Setup
- Purchase `sumanthminerals.com` from Namecheap or GoDaddy.
- Point DNS to Vercel (Vercel provides a step-by-step guide).
- SSL is automatically handled by Vercel.

---

## SEO Checklist & Strategy
1. **Google Search Console:** Submit `sitemap.xml` to Google.
2. **Google Business Profile:** Create a profile for the Lakshayampalli location.
3. **Keyword Optimization:** We have used keywords like "Quartz supplier India" and "Silica quartz 99% supplier" in meta tags and headings.
4. **Backlinks:** List the company on industrial directories like IndiaMART, Alibaba, and TradeIndia.
5. **Content:** Regularly update the Blog section with articles about quartz applications.

---

## Marketing Strategy for Quartz Export

### How to get the first 10 international buyers:
1. **LinkedIn Outreach:** Identify procurement managers in glass and ceramic companies in target regions (UAE, Europe, SE Asia). Share technical lab reports.
2. **Alibaba/Global Sources:** Set up a professional profile with high-quality images of the mines and the 99% silica reports.
3. **Cold Emailing:** Use the inquiry data and research potential B2B partners. Send a professional brochure (PDF) and offer sample shipments.
4. **Trade Fairs:** Participate in mineral and mining expos in Dubai (Big 5) or Germany (GIFA).
5. **Google Ads:** Run targeted search ads for keywords like "Buy industrial quartz bulk" targeting specific countries.

---

## Folder Structure
- `src/app/`: Pages and API routes
- `src/components/`: Reusable UI components
- `src/models/`: MongoDB schemas
- `src/lib/`: Database connection logic
- `public/`: Static assets (images, brochure PDF)
