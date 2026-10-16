# BazarDor

## Project Overview

BazarDor is a market-price discovery application for browsing everyday goods and comparing their prices across categories and local markets. It helps users explore current prices, recent price changes, and market-level minimum, maximum, and average prices in one place.

> **Current scope:** The frontend currently focuses on product and market-price discovery. Shopping cart, checkout, and order placement are not implemented in this repository.

## Live Demo & Base URLs

- **Live application:** [Insert live site URL]
- **Backend API base URL:** [Insert API base URL]

The catalog API helper appends `/api/bazardor` to `API_BASE_URL`. For example, if the backend routes are hosted at `https://api.example.com`, set `API_BASE_URL=https://api.example.com`.

## Features

### Currently implemented

- Browse products from the catalog and view products grouped by category.
- See products with rising or falling prices, plus stable-price products.
- Compare today’s prices across markets, including minimum, maximum, and average prices.
- Review current, yesterday’s, last week’s, and last month’s product prices.
- Sort category listings by price from low to high or high to low.
- Register and sign in with email and password, view a profile, and update profile information.
- Protect product-detail pages behind authentication and return users to the requested page after sign-in.

### Potential future additions

These are ideas for extending the application; they are **not currently implemented**:

- Shopping cart and checkout.
- Order history and order tracking.
- Product search, filters, and saved favorites.
- Price alerts and notifications.
- Delivery address and payment-method management.

## Tech Stack

| Category | Tools |
| --- | --- |
| UI framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, DaisyUI 5 |
| Data fetching | Next.js server-side `fetch` with revalidation |
| Authentication | Better Auth |
| Database adapter | MongoDB adapter for Better Auth |
| Notifications | React Hot Toast |
| Linting | ESLint 9, `eslint-config-next` |

The application uses React and Next.js server/client components for UI and application state. No separate global state-management library is configured.

## Prerequisites

- **Node.js:** 20.9 or later.
- **Package manager:** npm (the repository includes `package-lock.json`).
- A reachable catalog API.
- A MongoDB connection for Better Auth.

## Environment Variables

Create a `.env.local` file in the repository root:

```dotenv
# Backend origin. The application appends /api/bazardor for catalog requests.
API_BASE_URL=https://api.example.com

# Public URL of this application, used by the Better Auth client.
BETTER_AUTH_URL=http://localhost:3000

# MongoDB connection string used by the Better Auth server configuration.
MONGODB_URI=mongodb://127.0.0.1:27017/bazardor
```

Replace the example values with the URLs and connection string for your environment. Keep `.env.local` and all credentials out of version control. `API_BASE_URL` is read by server-side code and does not need the `NEXT_PUBLIC_` prefix.

## Getting Started

```bash
# Clone the repository
git clone [Insert repository URL]
cd [repository directory]

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run ESLint
```

## Folder Structure

```text
.
├── app/
│   ├── api/auth/[...all]/  # Better Auth API route
│   ├── category/[slug]/    # Category listing page
│   ├── product/[slug]/     # Product detail page
│   ├── profile/            # Profile page
│   ├── signin/             # Sign-in page
│   ├── signup/             # Sign-up page
│   ├── update/             # Profile update page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Home page
├── components/              # Shared UI and form components
├── lib/
│   ├── api.ts               # Catalog API helpers
│   ├── auth-client.ts       # Better Auth client
│   ├── auth.ts              # Better Auth server configuration
│   └── format.ts            # Formatting helpers
├── public/                  # Static assets
├── types.ts                 # Shared TypeScript data types
├── package.json
└── package-lock.json
```

## API Integration & Endpoints

Catalog requests are made server-side by the helpers in `lib/api.ts` and use a 10-minute Next.js revalidation interval.

| Method | Endpoint | Frontend use |
| --- | --- | --- |
| `GET` | `{API_BASE_URL}/api/bazardor/categories` | Load categories for navigation and shared layout. |
| `GET` | `{API_BASE_URL}/api/bazardor/categories/{slug}` | Load a category by slug. |
| `GET` | `{API_BASE_URL}/api/bazardor/products` | Load products for the home page and product lookup. |
| `GET` | `{API_BASE_URL}/api/bazardor/products?category={slug}` | Load products for a category. |
| `*` | `/api/auth/*` | Better Auth handler for authentication requests. |

The product-detail page currently finds the product by slug from the products list; it does not call a dedicated product-by-slug endpoint. The backend must return product and market-price fields matching the TypeScript interfaces in `types.ts`.

## Authentication & State Management

- Better Auth provides email/password registration, sign-in, sign-out, session lookup, and profile updates.
- The authentication API is handled by the Next.js route at `/api/auth/*`; the MongoDB adapter persists Better Auth data.
- The Better Auth client reads `BETTER_AUTH_URL`. The server-side auth configuration requires `MONGODB_URI`.
- Session state is read with Better Auth’s `useSession` hook in client components and checked server-side for protected pages.
- Authentication/session handling is managed by Better Auth; this repository does not define a separate token-storage or global state-management layer. Avoid manually storing session tokens in application code.

Google and GitHub sign-in buttons are present in the interface. Configure those providers in the Better Auth server settings and provide their credentials before relying on social sign-in in a deployment.

## Contribution & Git Workflow

1. Fork the repository and create a branch from the default branch.
2. Use a descriptive branch name, such as `feat/category-filters`, `fix/auth-redirect`, or `docs/readme`.
3. Keep changes focused and follow the existing TypeScript and component conventions.
4. Before opening a pull request, run:

   ```bash
   npm run lint
   npm run build
   ```

5. Push your branch and open a Pull Request (PR) against the default branch. Describe the change, link any related issue, and include screenshots for user-interface changes.

## License

No license is specified in this repository. Add a license before redistributing or reusing the project.