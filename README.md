# next-landing-starter

![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)

A production-ready, opinionated **Next.js landing page starter** built for enterprise-grade web presence. It ships with full internationalization (i18n), dark/light theme support, a CAPTCHA-protected contact form with transactional email delivery, SEO primitives, and a polished component system — so you can focus on content and branding instead of boilerplate.

**Target audience:** Freelancers, agencies, and product teams who need a solid, maintainable foundation for a multilingual marketing or portfolio site with real lead-capture functionality.

---

## Tech Stack & Features

### Technologies Used

| Layer                    | Technology                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Framework**            | [Next.js 16](https://nextjs.org/) (App Router)                                                       |
| **Language**             | [TypeScript 5](https://www.typescriptlang.org/)                                                      |
| **Styling**              | [Tailwind CSS v4](https://tailwindcss.com/) + `tw-animate-css`                                       |
| **Component System**     | [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/)                                |
| **Icons**                | [Lucide React](https://lucide.dev/)                                                                  |
| **i18n**                 | [next-intl v4](https://next-intl-docs.vercel.app/)                                                   |
| **Theming**              | [next-themes](https://github.com/pacocoursey/next-themes)                                            |
| **Forms**                | [React Hook Form v7](https://react-hook-form.com/) + [Zod v4](https://zod.dev/)                      |
| **CAPTCHA**              | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (`@marsidev/react-turnstile`) |
| **Email Delivery**       | [Resend](https://resend.com/) (REST API, no SDK)                                                     |
| **Linting / Formatting** | ESLint 9 + Prettier 3                                                                                |

### Key Features

- 🌐 **Full Internationalization (i18n)** — English and Indonesian locales out of the box, with automatic locale detection and routing via `next-intl`. Easily extendable to additional languages.
- 🌗 **Dark / Light Theme Switching** — System-preference-aware theme toggle using `next-themes`, fully integrated across all components.
- 📬 **CAPTCHA-Protected Contact Form** — A fully accessible, server-validated contact form featuring Cloudflare Turnstile CAPTCHA, Zod schema validation, and inline i18n error messages.
- ✉️ **Transactional Email via Resend** — Contact submissions dispatch a formatted HTML email via the Resend API, with a graceful server-side logging fallback for local development.
- 🗺️ **SEO-Ready Primitives** — Auto-generated `sitemap.ts`, `robots.ts`, and dynamic Open Graph image generation (`opengraph-image.tsx`) per locale.
- 📄 **Legal Page Templates** — Pre-structured Privacy Policy and Terms of Service pages under the locale-aware App Router.
- 🧩 **Composable Section Components** — Modular `HeroSection`, `AboutSection`, `ServicesSection`, and `ContactSection` that map directly to landing page anatomy.
- 📱 **Responsive Layout** — Mobile-first responsive Navbar with a dedicated `MobileMenu` component and an accessible language switcher.
- ✅ **Form Validation** — Client-side Zod validation with localized error messages and `react-hook-form` for performance-optimized re-renders.

---

## Getting Started (Local Setup)

### Prerequisites

- **Node.js** `>= 20.9.0` (LTS recommended)
- **npm** `>= 10.x` (bundled with Node.js 20)
- A **Cloudflare Turnstile** site/secret key pair (free tier available at [dash.cloudflare.com](https://dash.cloudflare.com/))
- A **Resend** API key (free tier available at [resend.com](https://resend.com/)) — _optional for local development, falls back to server logging_

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/narujib/next-landing-starter.git
cd next-landing-starter

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Fill in your credentials in .env.local (see section below)
#    Then start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env.local` and populate the following variables. **Never commit `.env.local` to version control.**

```env
# ─── Email Delivery ─────────────────────────────────────────────────────────
# Server-side only — do NOT prefix with NEXT_PUBLIC_
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL_TO=inquiries@yourdomain.com
CONTACT_EMAIL_FROM=Your Name <onboarding@resend.dev>

# ─── Cloudflare Turnstile CAPTCHA ───────────────────────────────────────────
# Client-side — safe to expose in the browser
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA_your_site_key

# Server-side only — do NOT prefix with NEXT_PUBLIC_
TURNSTILE_SECRET_KEY=0x4AAAAAAA_your_secret_key
```

> **Note:** If `RESEND_API_KEY` is omitted, the email service gracefully falls back to printing the submission details to the server console — useful for local development without setting up Resend.

---

## Project Structure

```
next-landing-starter/
├── app/                        # Next.js App Router root
│   ├── [locale]/               # Locale-scoped routes (i18n)
│   │   ├── page.tsx            # Main landing page
│   │   ├── layout.tsx          # Locale layout (fonts, providers)
│   │   ├── opengraph-image.tsx # Dynamic OG image generation per locale
│   │   ├── privacy-policy/     # Privacy Policy page
│   │   └── terms-of-service/   # Terms of Service page
│   ├── api/
│   │   └── contact/            # POST /api/contact — form handler & email dispatch
│   ├── globals.css             # Global CSS, Tailwind base layer, design tokens
│   ├── layout.tsx              # Root layout (ThemeProvider, html/body)
│   ├── robots.ts               # Auto-generated robots.txt
│   └── sitemap.ts              # Auto-generated sitemap.xml
│
├── components/                 # All UI components
│   ├── layout/                 # Structural layout components
│   │   ├── Navbar.tsx          # Top navigation bar with language switcher
│   │   ├── MobileMenu.tsx      # Animated off-canvas mobile navigation
│   │   └── Footer.tsx          # Site footer with links and locale info
│   ├── sections/               # Landing page section components
│   │   ├── HeroSection.tsx     # Above-the-fold hero with CTA
│   │   ├── AboutSection.tsx    # Company or product "about" section
│   │   ├── ServicesSection.tsx # Services/features grid
│   │   ├── ServiceCard.tsx     # Individual service card sub-component
│   │   └── ContactSection.tsx  # CAPTCHA-protected contact form + info panel
│   ├── seo/                    # SEO meta/structured-data components
│   ├── ui/                     # shadcn/ui primitive components (Button, Input, etc.)
│   ├── language-switcher.tsx   # Locale toggle dropdown
│   ├── theme-provider.tsx      # next-themes provider wrapper
│   └── theme-toggle.tsx        # Dark/light mode toggle button
│
├── i18n/                       # next-intl configuration
│   ├── routing.ts              # Locale list, default locale, detection config
│   └── request.ts              # Per-request locale resolution
│
├── lib/                        # Shared utilities and server-side helpers
│   ├── email.ts                # HTML email renderer + Resend dispatch function
│   ├── utils.ts                # General utility helpers (e.g., cn)
│   └── validations/            # Zod schemas (e.g., contact form schema)
│
├── messages/                   # i18n translation files
│   ├── en.json                 # English translations
│   └── id.json                 # Indonesian translations
│
├── .env.example                # Environment variable template (safe to commit)
├── next.config.ts              # Next.js configuration (next-intl plugin)
├── tsconfig.json               # TypeScript compiler options
├── eslint.config.mjs           # ESLint flat config
└── components.json             # shadcn/ui CLI configuration
```

---

## Development

### Available Scripts

```bash
npm run dev      # Start the local development server (http://localhost:3000)
npm run build    # Produce an optimised production build
npm run start    # Serve the production build locally
npm run lint     # Run ESLint across the codebase
npm run format   # Auto-format all files with Prettier
```

---

## Customization Guide

### 1. Editing Page Content & Copy

All user-facing text is managed through the i18n translation files — **do not hardcode strings directly in components.**

| Locale     | File               |
| ---------- | ------------------ |
| English    | `messages/en.json` |
| Indonesian | `messages/id.json` |

Update the relevant key in both files and the change will reflect across all components automatically.

### 2. Adding a New Landing Page Section

1. **Create the component** in `components/sections/YourSection.tsx`.
2. **Add translation keys** to `messages/en.json` and `messages/id.json` under a new namespace (e.g., `"yourSection": { "title": "..." }`).
3. **Consume translations** inside the component:
   ```tsx
   const t = useTranslations("yourSection");
   ```
4. **Register it** in `app/[locale]/page.tsx` by importing and placing the component in the desired order.

### 3. Adding a New Language / Locale

1. **Declare the locale** in `i18n/routing.ts`:
   ```ts
   export const locales = ["en", "id", "fr"] as const; // add your locale here
   ```
2. **Create the translation file** `messages/fr.json` (copy `en.json` as a template and translate).
3. **Update the language switcher** labels in `components/language-switcher.tsx` if you display locale names explicitly.

The routing, middleware, and `hreflang` meta tags will pick up the new locale automatically.

### 4. Configuring Email & CAPTCHA Services

All credentials are managed via environment variables — see the [Environment Variables](#environment-variables) section. No source code changes are required to swap API keys or change recipient addresses.

| What to change                     | Variable                         |
| ---------------------------------- | -------------------------------- |
| Email recipient                    | `CONTACT_EMAIL_TO`               |
| Sender display name / address      | `CONTACT_EMAIL_FROM`             |
| Turnstile widget on the client     | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` |
| Turnstile server-side verification | `TURNSTILE_SECRET_KEY`           |

### 5. Extending the Contact Form

The form schema is the single source of truth for both client-side validation and the API route handler.

- **Schema:** `lib/validations/contact.ts` — add or modify Zod fields here.
- **Form UI:** `components/sections/ContactSection.tsx` — add the corresponding `<input>` / `<Controller>` field.
- **API handler:** `app/api/contact/route.ts` — the handler already parses the schema; new fields are available automatically once added to the schema.
- **Email template:** `lib/email.ts` — update the HTML renderer to include the new field in the outbound email body.
