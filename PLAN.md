# Liquid Glass Toolbar + Presentation Mode Plan

## Overview
Add a macOS "Liquid Glass" style floating toolbar at the top of the page with:
1. Display controls (theme toggle)
2. Seminar callout
3. Reading/Presentation mode toggle (presentation default)

## Design: Liquid Glass Aesthetic
Apple's Liquid Glass design language features:
- Frosted glass effect (`backdrop-filter: blur(20px)`)
- Semi-transparent background (`rgba(255,255,255,0.7)` / `rgba(0,0,0,0.5)` dark)
- Subtle border with transparency
- Soft shadows
- Pill-shaped/rounded corners
- Floating appearance with slight elevation

## Implementation Plan

### Phase 1: Liquid Glass Toolbar Component
**File:** `src/components/Toolbar.tsx`

1. Create a floating toolbar fixed at top center
2. Apply Liquid Glass CSS:
   ```css
   .liquid-glass {
     backdrop-filter: blur(20px) saturate(180%);
     -webkit-backdrop-filter: blur(20px) saturate(180%);
     background: rgba(255, 255, 255, 0.72);
     border: 1px solid rgba(255, 255, 255, 0.3);
     border-radius: 16px;
     box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
   }
   html.dark .liquid-glass {
     background: rgba(30, 30, 30, 0.72);
     border: 1px solid rgba(255, 255, 255, 0.1);
   }
   ```
3. Toolbar contains:
   - Theme toggle (existing, moved here)
   - Seminar callout (compact pill button)
   - Mode toggle: Reading | Presentation

### Phase 2: Mode State Management
**File:** `src/App.tsx`

1. Add state: `mode: 'presentation' | 'reading'` (default: 'presentation')
2. Save preference to localStorage
3. Pass mode to content renderer

### Phase 3: Presentation Mode
**Approach:** Use Reveal.js embedded in React

**Option A - Full Reveal.js Integration:**
- Install `reveal.js` package
- Create `PresentationView` component
- Parse markdown into slides (split on `## ` for h2 sections)
- Each h2 section becomes a slide
- Sub-sections (h3) become vertical slides (nested)

**Option B - Simpler Custom Implementation:**
- CSS-based full-screen slides
- Use existing content, paginate by sections
- Arrow key navigation
- Progress indicator
- Simpler but less "pro slick"

**Recommendation:** Option A (Reveal.js) for the "pro slick things" you remember

### Phase 4: Slide Structure
Parse `content.md` into slides:
```
Slide 1: Title (# Webb's 5 Things)
Slide 2: How to Build 50x Faster (## How to Build...)
Slide 3: Introduction (## Introduction)
Slides 4-N: Each ## becomes a horizontal slide
  - Each ### under it becomes a vertical slide (down arrow)
```

### Phase 5: Presentation Features
- Keyboard navigation (arrows, space, escape)
- Progress bar at bottom
- Slide counter
- Fullscreen toggle (F key)
- Overview mode (O key)
- Speaker notes (S key) - could use blockquotes as notes

## File Changes

### New Files
- `src/components/Toolbar.tsx` - Liquid Glass toolbar
- `src/components/PresentationView.tsx` - Reveal.js wrapper
- `src/styles/liquid-glass.css` - Liquid Glass styles (or add to index.css)

### Modified Files
- `src/App.tsx` - Add mode state, conditionally render Reading vs Presentation
- `src/index.css` - Add Liquid Glass styles
- `package.json` - Add reveal.js dependency

## Questions Before Implementing

1. **Reveal.js vs Custom:** Full Reveal.js integration, or simpler custom slides?
2. **Slide granularity:** Each h2 as a slide, or each h3 as a slide?
3. **Mobile:** Should presentation mode be disabled on mobile?
4. **Transitions:** Preference for slide transitions (slide, fade, convex, etc.)?

## Implementation Order

1. Add Liquid Glass styles to `index.css`
2. Create Toolbar component with theme toggle + mode toggle
3. Move theme toggle from sidebar to toolbar
4. Add seminar callout to toolbar
5. Install reveal.js
6. Create markdown-to-slides parser
7. Create PresentationView component
8. Wire up mode toggle
9. Test and refine

## Estimated Complexity
- Toolbar + Liquid Glass: ~1 hour
- Reveal.js integration: ~2 hours
- Polish and testing: ~1 hour

Total: ~4 hours of focused work
