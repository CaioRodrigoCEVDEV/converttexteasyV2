# ConvertTextEasy V2

Free online text tools — convert, format, and transform text instantly. Everything runs in your browser. No sign-up. No data sent to servers.

## Stack

- **Next.js** 16 (App Router, Turbopack)
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 4
- **Vitest** for testing
- **ESLint** 9

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests (vitest) |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
  app/                          # App Router pages
    layout.tsx                  # Root layout (ThemeScript, ThemeProvider, Header, Footer)
    page.tsx                    # Home page (Hero, ToolGrid, Benefits, CTA)
    globals.css                 # Tailwind + dark mode variant config
    about/                      # /about
    contact/                    # /contact
    privacy-policy/             # /privacy-policy
    terms/                      # /terms
    tools/
      page.tsx                  # /tools — tool listing with status badges
      uppercase/
        page.tsx                # Server page (metadata only)
        UppercaseTool.tsx       # Client component (wires transform to ToolEditor)
  components/
    layout/
      Header.tsx                # Sticky header + nav + theme toggle
      Footer.tsx                # Footer with link sections
      Container.tsx             # Max-width wrapper (unused, available for future)
    home/
      Hero.tsx                  # Hero with animated badge, gradient text, CTAs
      ToolGrid.tsx              # Tool cards grid on home
      Benefits.tsx              # 4-benefit section
    tools/
      ToolEditor.tsx            # Reusable input/output editor with copy/clear/char count
    theme/
      ThemeScript.tsx           # Inline `<script>` to prevent theme flash
      ThemeProvider.tsx         # React context: theme state, persistence, system preference
      ThemeToggle.tsx           # Sun/moon toggle button
  lib/
    tools/
      transforms.ts             # Pure transform functions
      transforms.test.ts        # Unit tests for all transforms (29 tests)
    seo/
      metadata.ts               # buildMetadata() helper for OG/Twitter/robots
  data/
    tools.ts                    # Tool registry (8 tools, 1 available)
    site.ts                     # Site-wide constants (name, nav, footer links)
```

## How to Add a New Tool

1. **Add a transform function** in `src/lib/tools/transforms.ts`:
   ```ts
   export function myTransform(text: string): string {
     return text; // your logic
   }
   ```

2. **Add a registry entry** in `src/data/tools.ts`:
   ```ts
   { slug: "my-tool", name: "My Tool", description: "...", status: "available", category: "...", icon: "..." }
   ```

3. **Create the page** at `src/app/tools/my-tool/`:
   - `page.tsx` — server component with metadata
   - `MyTool.tsx` — client component that imports the transform and renders `ToolEditor`

4. **Add tests** in `src/lib/tools/transforms.test.ts`

## Dark / Light Mode

- Toggle button in the header (sun/moon icon)
- Preference persisted in `localStorage`
- Respects `prefers-color-scheme` when no stored preference exists
- Inline script in `<head>` prevents flash of wrong theme on load
- All components use Tailwind `dark:` variants

## Sprint 1 (Completed)

- Next.js + TypeScript + Tailwind + App Router setup
- All pages created (home, tools, about, contact, privacy, terms)
- Uppercase Converter functional
- Tool registry + pure transforms
- Basic SEO with metadata builder

## Sprint 2 (Completed)

- Dark/light mode with flash prevention + localStorage persistence
- Visual refinements across all pages (Hero grid pattern, improved cards, better empty states)
- ToolEditor UX improvements (mono font, copy confirmation icon, dual char counters, better spacing)
- `/tools` page with available/coming-soon count badges, category chips
- 29 unit tests for all 5 transform functions
- ToolEditor as polished reusable component

## Next Steps

1. Implement remaining tools (lowercase, capitalize, remove spaces, word counter, etc.)
2. Create a shared `ToolCard` component (deduplicate between ToolGrid and /tools page)
3. Add sitemap generation
4. Implement i18n
5. Create a blog section
6. Consider a backend for server-side tools (if needed)
