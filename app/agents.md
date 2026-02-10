# App Directory Agent Guide

**Package:** Next.js App Router pages and layouts

## Package Identity

This directory contains the Next.js App Router application code including pages, layouts, loading states, error boundaries, and route handlers.

**Primary Tech:** Next.js 16 App Router, TypeScript, Tailwind CSS v4

## Setup & Run

```bash
# Run dev server (root level)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Patterns & Conventions

### File Organization

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── globals.css         # Global styles
├── favicon.ico         # Site favicon
├── [route]/           # Dynamic route
│   ├── page.tsx       # Route page
│   └── layout.tsx     # Route-specific layout
├── (group)/           # Route group (no URL segment)
│   └── nested/        # Nested routes
└── api/               # API routes
    └── [route]/route.ts
```

### Naming Conventions

- **Pages:** `page.tsx` (required for route)
- **Layouts:** `layout.tsx` (wraps pages in segment)
- **Loading:** `loading.tsx` (loading UI for segment)
- **Error:** `error.tsx` (error boundary for segment)
- **Not Found:** `not-found.tsx` (404 page for segment)
- **Route Handlers:** `route.ts` (in `/api/` routes only)

### Component Patterns

**✅ DO: Use Server Components by default**
```tsx
// app/page.tsx - Server component (no "use client")
export default function Page() {
  return <div>Hello World</div>
}
```

**✅ DO: Mark Client Components explicitly**
```tsx
// app/components/Counter.tsx - Client component
"use client"

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**✅ DO: Use layout.tsx for shared UI**
```tsx
// app/layout.tsx - Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**❌ DON'T: Use "use client" unnecessarily**
```tsx
// DON'T - This is a server component, no need for "use client"
"use client" // ← Remove this
export default function Page() {
  return <div>Static content</div>
}
```

**✅ DO: Use async/await for data fetching**
```tsx
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products')
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}
```

**✅ DO: Use loading.tsx for pending states**
```tsx
// app/products/loading.tsx
export default function Loading() {
  return <div className="animate-pulse">Loading products...</div>
}
```

### Styling Patterns

**✅ DO: Use Tailwind utility classes**
```tsx
export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome</h1>
    </div>
  )
}
```

**✅ DO: Use CSS variables for theme colors**
```tsx
// Use theme variables from globals.css
export default function Page() {
  return (
    <div className="bg-background text-foreground">
      <p>Themed content</p>
    </div>
  )
}
```

**❌ DON'T: Hardcode colors**
```tsx
// DON'T - Use CSS variables instead
<div className="bg-[#ffffff] text-[#171717]"> // ← Use bg-background text-foreground
```

### Route Handler Patterns

**✅ DO: Use route.ts for API endpoints**
```tsx
// app/api/products/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await fetchProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const data = await request.json()
  const product = await createProduct(data)
  return NextResponse.json(product, { status: 201 })
}
```

## Touch Points / Key Files

| Purpose | File |
|---------|------|
| Root layout (fonts, global styles) | `layout.tsx` |
| Home page | `page.tsx` |
| Global CSS (Tailwind v4, theme) | `globals.css` |
| Site favicon | `favicon.ico` |

## JIT Index Hints

```bash
# Find all pages
find app -name "page.tsx"

# Find all layouts
find app -name "layout.tsx"

# Find client components
rg -n '"use client"' app/

# Find server components (files without use client)
rg -L '"use client"' app/

# Find API route handlers
rg -n "export (async )?function (GET|POST|PUT|DELETE)" app/

# Find async data fetching
rg -n "export default async function" app/

# Find loading states
find app -name "loading.tsx"

# Find error boundaries
find app -name "error.tsx"
```

## Common Gotchas

- **Client Components:** Must have `"use client"` at the very top of the file (before imports)
- **Server Actions:** Need `"use server"` directive if defined in separate files
- **Dynamic Routes:** Use `[param]` syntax for dynamic segments
- **Route Groups:** Wrap in `(group)` for organization without URL segment
- **Metadata:** Export `metadata` object for SEO, or `generateMetadata` for dynamic metadata
- **Images:** Always use `next/image` component for optimization
- **Links:** Use `next/link` component for navigation (prefetching enabled by default)

## Pre-PR Checks

```bash
# Lint app directory
pnpm lint

# TypeScript check (all)
npx tsc --noEmit

# Build to verify all routes compile
pnpm build
```

## Next.js App Router Reference

For Next.js 16 App Router patterns, always check local docs or https://nextjs.org/docs/app

Key concepts:
- **Server Components:** Default, no JavaScript sent to client
- **Client Components:** Need `"use client"`, interactive features
- **Streaming:** Automatic with async components and loading.tsx
- **Caching:** Configure with `fetch` options or `revalidate` in route segment config