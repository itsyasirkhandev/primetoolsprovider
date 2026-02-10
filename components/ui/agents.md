# UI Components Agent Guide

**Package:** shadcn/ui component library

## Package Identity

This directory contains reusable UI components built with shadcn/ui patterns. Components are copied from shadcn/ui registry and customized for this project.

**Primary Tech:** Radix UI primitives, Tailwind CSS v4, TypeScript, React 19

## Setup & Run

```bash
# Install a new shadcn/ui component
npx shadcn@latest add [component-name]

# Example: Install button component
npx shadcn@latest add button

# Run dev server to preview
pnpm dev
```

## Patterns & Conventions

### File Organization

```
components/ui/
├── button.tsx           # Button component
├── card.tsx             # Card component
├── input.tsx            # Input component
└── [component].tsx      # Other UI components
```

### Naming Conventions

- **Component files:** Lowercase kebab-case: `button.tsx`, `data-table.tsx`
- **Component exports:** PascalCase: `export const Button`, `export const DataTable`
- **Variants:** Use `variant` prop with string literals: `"default" | "destructive" | "outline"`
- **Sizes:** Use `size` prop with string literals: `"default" | "sm" | "lg" | "icon"`

### Component Patterns

**✅ DO: Follow shadcn/ui structure**
```tsx
// components/ui/button.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**✅ DO: Use Radix UI primitives**
```tsx
// components/ui/dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
// ... etc
```

**✅ DO: Use class-variance-authority (cva) for variants**
```tsx
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg",
        outlined: "border-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
```

**✅ DO: Use forwardRef for ref forwarding**
```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} className={cn(className)} {...props} />
  }
)
Button.displayName = "Button"
```

**✅ DO: Use cn utility for className merging**
```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**❌ DON'T: Create custom styling without variants**
```tsx
// DON'T - Use cva for variants instead
const Button = ({ variant, className }) => {
  const styles = variant === "primary" ? "bg-blue-500" : "bg-gray-500"
  return <button className={`${styles} ${className}`}> // ← Use cva
```

**❌ DON'T: Hardcode colors without design tokens**
```tsx
// DON'T - Use CSS variables from globals.css
<div className="bg-[#3b82f6] text-[#ffffff]"> // ← Use bg-primary text-primary-foreground
```

### Design System Tokens

Use CSS variables from `app/globals.css`:

```tsx
// Background colors
className="bg-background"           // Main background
className="bg-card"                 // Card background
className="bg-popover"              // Popover background
className="bg-muted"                // Muted background

// Foreground colors
className="text-foreground"         // Main text
className="text-card-foreground"    // Card text
className="text-muted-foreground"   // Muted text

// Primary colors
className="bg-primary"              // Primary background
className="text-primary-foreground" // Primary text

// Accent colors
className="bg-accent"               // Accent background
className="text-accent-foreground"  // Accent text

// Border colors
className="border-border"           // Border color
className="border-input"            // Input border

// Semantic colors
className="bg-destructive"          // Destructive (error)
className="text-destructive"        // Destructive text
className="bg-destructive/10"       // Destructive with opacity
```

## Touch Points / Key Files

| Purpose | File |
|---------|------|
| Theme CSS variables | `app/globals.css` |
| Utility function (cn) | `lib/utils.ts` *(create when needed)* |
| shadcn/ui config | `components.json` *(create when needed)* |

## JIT Index Hints

```bash
# Find all UI components
find components/ui -name "*.tsx"

# Find components using Radix UI
rg -n "@radix-ui" components/ui/

# Find components with cva variants
rg -n "cva\(" components/ui/

# Find components with forwardRef
rg -n "forwardRef" components/ui/

# Find component exports
rg -n "export (const|function|interface)" components/ui/
```

## Common Gotchas

- **Component Registry:** Components are copied from shadcn/ui registry, not installed as packages
- **Dependencies:** Each component may add its own dependencies to `package.json`
- **Customization:** Modify components in this directory after installation
- **Design Tokens:** Always use CSS variables from `globals.css` for colors
- **Radix UI:** Use Radix primitives for accessibility (tabs, dialogs, dropdowns, etc.)
- **Tailwind v4:** Uses new Tailwind v4 syntax with inline theme configuration
- **TypeScript:** All components must be properly typed with TypeScript

## Pre-PR Checks

```bash
# Lint components
pnpm lint

# TypeScript check
npx tsc --noEmit

# Build to verify components compile
pnpm build
```

## Component Installation Reference

To add new components from shadcn/ui:

```bash
# List available components
npx shadcn@latest add

# Add specific component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

Each component will be added to `components/ui/` and dependencies will be installed automatically.

## Design System Guidelines

When creating custom components:

1. **Follow shadcn/ui patterns** - Use cva for variants, forwardRef for refs
2. **Use design tokens** - Reference CSS variables from `globals.css`
3. **Ensure accessibility** - Use Radix UI primitives for interactive components
4. **TypeScript first** - All props must be properly typed
5. **Responsive design** - Use Tailwind responsive prefixes (`md:`, `lg:`)
6. **Dark mode support** - Use CSS variables that work in both light/dark modes