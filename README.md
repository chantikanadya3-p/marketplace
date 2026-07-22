# TJERMIN Marketplace

A responsive marketplace catalog built with Next.js and the Fake Store API.

## Installation

Clone the repository:

```bash
git clone https://github.com/chantikanadya3-p/marketplace.git
```

Open the project directory:

```bash
cd marketplace
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:

```bash
npm run build
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Redux Toolkit
- Redux Persist
- Framer Motion
- Fake Store API

## Data Fetching

TanStack Query is used to fetch and cache product data on the catalog page. It also handles loading states, error states, retries, and background revalidation.

The product detail page uses server-side data fetching with Next.js revalidation.

## Cart Persistence and Hydration

The shopping cart is managed with Redux Toolkit and persisted to browser `localStorage` using Redux Persist.

Because `localStorage` is not available during server rendering, the persistence configuration only accesses browser storage when `window` is available. A no-operation storage fallback is used on the server.

The application initially renders with the default Redux state. After the page runs in the browser, Redux Persist restores the saved cart state and updates components that depend on it, including the cart quantity badge. This prevents server-side storage access and reduces the risk of hydration mismatch.

## Live Demo

https://marketplace-xi-amber.vercel.app/