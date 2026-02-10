# Lib Agent Guide

**Package:** Utility libraries and helper functions

## Package Identity

This directory contains utility functions, helpers, and shared logic used across the application.

**Primary Tech:** TypeScript, Node.js built-ins

## Setup & Run

```bash
# Run dev server to test utilities
pnpm dev
```

## Patterns & Conventions

### File Organization

```
lib/
├── utils.ts             # General utility functions (cn helper)
├── api.ts               # API client wrapper
├── constants.ts         # App constants
├── validations.ts       # Validation schemas (Zod)
├── types.ts             # Shared TypeScript types
└── [module].ts          # Other utility modules
```

### Naming Conventions

- **Utility files:** Lowercase kebab-case: `utils.ts`, `api-client.ts`, `date-formatter.ts`
- **Function exports:** camelCase: `export function formatDate`, `export const cn`
- **Type exports:** PascalCase: `export type User`, `export interface ApiResponse`
- **Constant exports:** UPPER_SNAKE_CASE: `export const API_BASE_URL`

### Utility Patterns

**✅ DO: Create reusable helper functions**
```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to locale string
 */
export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

**✅ DO: Create API client wrapper**
```tsx
// lib/api.ts
import { headers } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

type ApiResponse<T> = {
  data: T
  error?: string
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
}
```

**✅ DO: Define shared types**
```tsx
// lib/types.ts
export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  discount?: string
  variations?: ProductVariation[]
}

export interface ProductVariation {
  option: string
  price: string
  price_range?: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
  meta?: {
    page: number
    limit: number
    total: number
  }
}

export type ApiResponseError = {
  error: string
  code?: string
  details?: Record<string, any>
}
```

**✅ DO: Create validation schemas**
```tsx
// lib/validations.ts
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Invalid image URL'),
  discount: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ProductInput = z.infer<typeof productSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
```

**✅ DO: Define app constants**
```tsx
// lib/constants.ts
export const APP_NAME = 'shadcn-dashboard'

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

export const DEBOUNCE = {
  DEFAULT: 300,
  SEARCH: 500,
} as const

export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'user-preferences',
} as const

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const
```

**❌ DON'T: Mix concerns in single file**
```tsx
// DON'T - Put everything in one file
// lib/utils.ts should only have generic utilities
// Don't put API logic, types, constants, etc. in utils.ts
```

**❌ DON'T: Hardcode values without constants**
```tsx
// DON'T - Use constants instead
const limit = 10 // ← Hardcoded

// DO - Use constants
import { PAGINATION } from '@/lib/constants'
const limit = PAGINATION.DEFAULT_LIMIT
```

**❌ DON'T: Use any without justification**
```tsx
// DON'T - Avoid any
function process(data: any) { // ← Bad type
  return data.value
}

// DO - Use proper types
function process(data: { value: string }) {
  return data.value
}
```

## Touch Points / Key Files

| Purpose | File |
|---------|------|
| Utility functions (cn, formatters) | `utils.ts` *(create when needed)* |
| API client | `api.ts` *(create when needed)* |
| Shared types | `types.ts` *(create when needed)* |
| Validation schemas | `validations.ts` *(create when needed)* |
| App constants | `constants.ts` *(create when needed)* |

## JIT Index Hints

```bash
# Find all lib files
find lib -name "*.ts" -o -name "*.tsx"

# Find utility functions
rg -n "export function" lib/utils.ts

# Find API client methods
rg -n "(get|post|put|delete):" lib/api.ts

# Find type exports
rg -n "export (type|interface)" lib/types.ts

# Find constants
rg -n "export const [A-Z_]+" lib/constants.ts

# Find validation schemas
rg -n "z\." lib/validations.ts
```

## Common Gotchas

- **Import Paths:** Use `@/lib/...` for absolute imports from `tsconfig.json` paths
- **Circular Dependencies:** Avoid importing between lib files
- **Type Exports:** Export types separately from values
- **Async Functions:** Handle errors and return types properly
- **Environment Variables:** Access via `process.env` with proper typing
- **Server vs Client:** Some utilities work only on client or server side

## Pre-PR Checks

```bash
# Lint lib directory
pnpm lint

# TypeScript check
npx tsc --noEmit

# Build to verify utilities compile
pnpm build
```

## Library Dependencies

Common utilities may need these packages:

```bash
# Tailwind class merging (required for cn helper)
pnpm add clsx tailwind-merge

# Validation (optional)
pnpm add zod

# Date handling (optional)
pnpm add date-fns dayjs

# HTTP client (optional)
pnpm add axios ky
```

## TypeScript Module Pattern

This project uses the `@/*` path alias from `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Import utilities:

```tsx
// From anywhere in the project
import { cn, formatDate } from '@/lib/utils'
import { api } from '@/lib/api'
import { Product } from '@/lib/types'
import { productSchema } from '@/lib/validations'
import { ROUTES } from '@/lib/constants'
```

## Utility Creation Checklist

When creating a new utility:

1. **Purpose** - Define clear, single responsibility
2. **Naming** - Use descriptive, lowercase kebab-case file names
3. **Types** - Add proper TypeScript annotations
4. **Pure Functions** - Prefer pure functions when possible
5. **Error Handling** - Handle errors appropriately
6. **Documentation** - Add JSDoc comments for complex functions
7. **Testing** - Test edge cases in dev server
8. **Export** - Export as named functions/types
9. **Import Path** - Use `@/lib/...` for imports
10. **Dependencies** - Keep dependencies minimal