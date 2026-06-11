# One Family Asthma Support Group (OFAS) Website - Handover Guide

This document provides an overview of the technical implementation, project structure, and instructions for maintenance and deployment.

## 1. Project Overview
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `lucide-react` icons.
- **CMS**: Decap CMS (configured for Git Gateway).
- **Forms**: React Hook Form + Zod validation.

## 2. Directory Structure
- `app/`: Main application routes (Pages).
  - `page.tsx`: Homepage.
  - `about/`, `programs/`, `resources/`, `volunteer/`, `contact/`, `donate/`, `events/`, `campus-bases/`: Static and functional pages.
  - `blog/`: Dynamic blog section reading from markdown.
  - `admin/`: (Not used, admin is in `public/admin`).
- `components/`: Reusable UI components.
  - `ui/`: Fundamental atoms (Button, Container, Input).
  - `layout/`: Structural components (Header, Footer).
  - `home/`: Homepage specific sections (Hero, Mission, Impact).
  - `forms/`: Functional forms (Volunteer, Contact, Event Registration).
- `content/`: Markdown content managed by CMS.
  - `posts/`: Blog posts.
  - `pages/`, `events/`: Placeholder folders for future CMS collections.
- `lib/`: Utilities.
  - `utils.ts`: Tailwind class merger.
  - `cms.ts`: Logic to read markdown files for the blog.
- `public/`: Static assets.
  - `admin/`: Decap CMS entry point (`index.html` and `config.yml`).
  - `uploads/`: Media files uploaded via CMS.

## 3. Key Features
- **Design System**: Brand colors (`#0808b2`) and accessible fonts (`Open Sans`, `Lato`) configured in `tailwind.config.ts`.
- **Responsive Navigation**: Mobile-friendly header with hamburger menu.
- **Forms**: 
  - Validated with Zod schema.
  - Currently simulate API calls (console.log). *Action Required: Connect to real backend/email service.*
- **Blog**: 
  - Reads Markdown files from `content/posts`.
  - Statically generated at build time (SSG) for performance.

## 4. Setup & Development
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 5. CMS Configuration (Decap CMS)
- The CMS is accessible at `/admin`.
- Configuration is in `public/admin/config.yml`.
- **Local Testing**: To test without a live backend, you can set `local_backend: true` in `config.yml` and run `npx decap-server` alongside `npm run dev`.
- **Production**: When deployed to Netlify, enable "Identity" and "Git Gateway" in Netlify Site Settings to allow admin login.

## 6. Next Steps for Deployment
1. **Push to GitHub**: Create a repository and push this code.
2. **Deploy to Netlify (Recommended)**:
   - Connect your GitHub repo.
   - Build command: `npm run build`.
   - Publish directory: `.next` (Netlify auto-detects Next.js).
   - **Important**: Enable **Netlify Identity** in Dashboard > Identity > Enable Identity. Then enable **Git Gateway** in Dashboard > Identity > Services.
3. **Environment Variables**:
   - Create a `.env` file if you add API keys (e.g., for Stripe or Email).

## 7. Future Enhancements
- **Email Integration**: Replace `console.log` in `components/forms/*` with a server action using Resend or Nodemailer.
- **Payments**: Replace usage of generic buttons in `app/donate/page.tsx` with real Stripe Checkout links.
- **Events CMS**: Connect `app/events/page.tsx` to read from `content/events` similar to the Blog.
