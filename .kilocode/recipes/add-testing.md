# Recipe: Add Testing

Add testing with Vitest and React Testing Library for unit and component tests.

## When to Use

- User wants automated tests for components, utilities, or API routes
- Application requires reliable test coverage before deployments
- Test-driven development (TDD) workflow is desired

## Prerequisites

- Base template already set up

## Setup Steps

### Step 1: Install Dependencies

```bash
bun add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Step 2: Create Vitest Configuration

#### `vitest.config.ts` - Vitest setup

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Step 3: Create Test Setup

#### `src/test/setup.ts` - Test environment setup

```typescript
import "@testing-library/jest-dom/vitest";
```

### Step 4: Add Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Step 5: Write Your First Test

#### `src/lib/utils.ts` - Example utility to test

```typescript
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
```

#### `src/lib/utils.test.ts` - Unit test

```typescript
import { describe, it, expect } from "vitest";
import { cn, formatCurrency } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });
});

describe("formatCurrency", () => {
  it("formats USD currency", () => {
    expect(formatCurrency(99)).toBe("$99.00");
  });

  it("formats large amounts", () => {
    expect(formatCurrency(3500)).toBe("$3,500.00");
  });
});
```

### Step 6: Write a Component Test

#### `src/components/ui/Button.tsx` - Example component

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "px-4 py-2 rounded-xl font-semibold text-sm transition-all";
  const variants = {
    primary: "bg-gradient-to-r from-brand-600 to-brand-500 text-white",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

#### `src/components/ui/Button.test.tsx` - Component test

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(clicked).toBe(true);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### Step 7: Testing API Routes

#### `src/app/api/health/route.ts` - Example API route

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
```

#### `src/app/api/health/route.test.ts` - API route test

```typescript
import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns ok status", async () => {
    const response = await GET();
    const data = await response.json();
    expect(data.status).toBe("ok");
  });
});
```

### Step 8: Run Tests

```bash
bun test
```

### Step 9: Commit and Push

```bash
bun typecheck && bun lint && bun test && git add -A && git commit -m "Add testing setup with Vitest" && git push
```

## Usage Tips

### Running tests

```bash
bun test              # Run all tests once
bun test:watch        # Run tests in watch mode
bun test:coverage     # Run with coverage report
```

### File naming convention

- Unit tests: `src/lib/utils.test.ts`
- Component tests: `src/components/Button.test.tsx`
- API route tests: `src/app/api/health/route.test.ts`

### Useful patterns

```typescript
// Testing async components
it("loads data", async () => {
  render(<AsyncComponent />);
  expect(await screen.findByText("Loaded!")).toBeInTheDocument();
});

// Mocking fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mock" }),
  } as Response)
);

// Mocking environment variables
vi.stubEnv("API_KEY", "test-key");
```

## Memory Bank Updates

After implementing, update `.kilocode/rules/memory-bank/context.md`:

- Add testing to "Recently Completed" section
- Document test file structure

Also update `.kilocode/rules/memory-bank/tech.md`:

- Add Vitest and Testing Library to dev dependencies
- Add test commands to development commands table
