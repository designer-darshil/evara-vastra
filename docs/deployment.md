# Deployment Strategy

## Build Process
The application is built using Vite and TypeScript (`npm run build`).

## Hosting
As a React Single Page Application (SPA), Evara Vastra can be hosted on static hosting providers such as Vercel, Netlify, or AWS S3 + CloudFront.

## Missing Infrastructure Requirements
To move to production, Evara Vastra requires a Backend-as-a-Service (BaaS) like Supabase/Firebase, or a custom Node.js/Python backend to handle:
1. **Database**: Persistent storage for Products, Orders, Users.
2. **Authentication**: JWT-based secure sessions for Admins and Customers.
3. **Payment API**: Serverless functions or backend endpoints to safely interact with Stripe/Razorpay to avoid exposing secret keys.
4. **Transactional Email**: Integration with SendGrid or Resend to fire emails on order creation.
