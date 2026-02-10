# Hooks Agent Guide

**Package:** Custom React hooks

## Package Identity

This directory contains custom React hooks for reusable stateful logic and side effects.

**Primary Tech:** React 19 hooks, TypeScript

## Setup & Run

```bash
# Run dev server to test hooks
pnpm dev
```

## Patterns & Conventions

### File Organization

```
hooks/
├── use-media-query.tsx    # Media query hook
├── use-debounce.ts        # Debounce hook
├── use-local-storage.ts   # Local storage hook
└── [use-hook].tsx         # Other custom hooks
```

### Naming Conventions

- **Hook files:** Lowercase kebab-case with `use-` prefix: `use-media-query.tsx`, `use-debounce.ts`
- **Hook exports:** PascalCase with `use` prefix: `export function useMediaQuery`, `export const useDebounce`
- **Hook return:** Return array `[value, setValue]` for state, object `{ value, setValue }` for complex state

### Hook Patterns

**✅ DO: Use "use" prefix convention**
```tsx
// hooks/use-media-query.tsx
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
```

**✅ DO: Provide proper TypeScript types**
```tsx
// hooks/use-local-storage.ts
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  return [storedValue, setValue]
}
```

**✅ DO: Clean up side effects**
```tsx
// hooks/use-debounce.ts
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer) // ← Cleanup
  }, [value, delay])

  return debouncedValue
}
```

**✅ DO: Handle SSR/window availability**
```tsx
// hooks/use-window-size.ts
export function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // Check for window availability (SSR safety)
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial call

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

**✅ DO: Use custom hooks for complex state**
```tsx
// hooks/use-form.ts
export function useForm<T extends Record<string, any>>(
  initialValues: T
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset,
  }
}
```

**❌ DON'T: Call hooks outside components/hooks**
```tsx
// DON'T - Hooks must be called at top level
function useBadHook() {
  if (condition) {
    const [state, setState] = useState(0) // ← Violates rules of hooks
  }
}
```

**❌ DON'T: Forget dependency arrays**
```tsx
// DON'T - Missing dependencies
useEffect(() => {
  fetchData(query)
}, []) // ← query should be in dependencies

// DO - Include all dependencies
useEffect(() => {
  fetchData(query)
}, [query])
```

**❌ DON'T: Mutate state directly**
```tsx
// DON'T - Direct mutation
const [items, setItems] = useState([])
items.push(newItem) // ← Wrong

// DO - Functional update
setItems(prev => [...prev, newItem])
```

## Touch Points / Key Files

| Purpose | File |
|---------|------|
| Media query hook | `use-media-query.tsx` *(create when needed)* |
| Debounce hook | `use-debounce.ts` *(create when needed)* |
| Local storage hook | `use-local-storage.tsx` *(create when needed)* |

## JIT Index Hints

```bash
# Find all hooks
find hooks -name "*.ts" -o -name "*.tsx"

# Find hook exports
rg -n "export (function|const) use" hooks/

# Find hooks using useEffect
rg -n "useEffect" hooks/

# Find hooks using useState
rg -n "useState" hooks/

# Find hooks with TypeScript generics
rg -n "<T>" hooks/
```

## Common Gotchas

- **Rules of Hooks:** Must be called at top level, never conditionally
- **Dependency Arrays:** Always include all dependencies in `useEffect`
- **Cleanup:** Always return cleanup function from `useEffect`
- **SSR Safety:** Check for `typeof window !== 'undefined'` for browser APIs
- **State Immutability:** Never mutate state directly, use functional updates
- **Hook Naming:** Always use "use" prefix for custom hooks

## Pre-PR Checks

```bash
# Lint hooks
pnpm lint

# TypeScript check
npx tsc --noEmit

# Build to verify hooks compile
pnpm build
```

## React Hooks Reference

This project uses React 19. Key hooks:

- `useState` - State management
- `useEffect` - Side effects
- `useRef` - DOM refs and persistent values
- `useCallback` - Memoized callbacks
- `useMemo` - Memoized values
- `useContext` - Context consumption
- `useReducer` - Complex state logic
- `useTransition` - Optimistic updates
- `useDeferredValue` - Deferred updates

For React hooks documentation: https://react.dev/reference/react

## Hook Creation Checklist

When creating a new hook:

1. **Name** - Use "use" prefix and descriptive name
2. **TypeScript** - Add proper type annotations
3. **Parameters** - Define clear parameter types
4. **Return** - Document return type and structure
5. **SSR Safe** - Handle server-side rendering
6. **Cleanup** - Add cleanup functions for side effects
7. **Dependencies** - Include all dependencies in arrays
8. **Export** - Export as named function
9. **Test** - Test hook behavior in dev server
10. **Document** - Add JSDoc comments for complex hooks