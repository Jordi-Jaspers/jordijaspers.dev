# jordijaspers.dev Styling Guide

## Framework

- **UI Framework:** SvelteKit 2 + Svelte 4
- **CSS:** Tailwind CSS 3 with HSL custom properties
- **Components:** shadcn-svelte (bits-ui based)
- **Icons:** lucide-svelte

## Design Philosophy

Bento-grid portfolio with clean, modern aesthetic. Rounded cards with subtle shadows. Light/dark mode support. Draggable interactive tiles.

## Design Tokens

### Colors (HSL custom properties in `app.css`)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `0 0% 100%` | `20 14.3% 4.1%` | Page background |
| `--foreground` | `20 14.3% 4.1%` | `60 9.1% 97.8%` | Text color |
| `--primary` | `47.9 95.8% 53.1%` | same | Accent yellow/gold |
| `--muted` | `60 4.8% 95.9%` | `12 6.5% 15.1%` | Subtle backgrounds |
| `--accent` | `0 12.2% 91.96%` | `215 15.38% 15.29%` | Card borders (dark) |
| `--border` | `20 5.9% 90%` | `12 6.5% 15.1%` | Borders |
| `--radius` | `1rem` | same | Border radius |

### Typography

| Font | Family | Usage |
|------|--------|-------|
| Moranga | `font-moranga` | Headings, display text |
| Silka | `font-silka` | Body text |
| Montserrat | `font-montserrat` | Regular text (`.regular-text`) |

### Spacing

- Grid item size: 164px × 164px
- Grid gap: 16px
- Card padding: `p-8`
- Border radius: `rounded-3xl` (cards), `rounded-full` (buttons)

## Component Patterns

### Grid Item Card
```css
.grid-item {
  overflow-hidden rounded-3xl border-4 border-transparent
  bg-background p-8 shadow-md hover:shadow-xl
  dark:border-accent dark:bg-[#090c10]
}
```

### Link Button
```css
.link-button {
  absolute z-[10] m-2 h-8 w-8 rounded-full bg-background
  box-shadow: accent 0px 0px 0px 2px → 5px on hover
}
```

### Infinite Scroll Animations
- `animate-infinite-x-scroll` (40s linear)
- `animate-infinite-x-scroll-reverse` (40s linear)
- `animate-infinite-y-scroll` (40s linear)

## Visual Polish Checklist

- [ ] Consistent spacing (164px grid, 16px gap)
- [ ] Loading states for map tile (Mapbox)
- [ ] Dark mode: accent borders on cards
- [ ] Focus states on interactive elements
- [ ] Color contrast meets WCAG AA
- [ ] Smooth transitions (300ms cubic-bezier)
- [ ] Rainbow gradient text for highlights
