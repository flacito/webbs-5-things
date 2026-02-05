# Webb's 5 Things - Architecture Document

## Project Overview

A React SPA presentation site for "Webb's 5 Things for AI" using Reveal.js for slides and ReactMarkdown for content rendering. Features dual-mode viewing (presentation/reading), theme switching, and custom HTML tags for enhanced content control.

**GitHub Repository:** https://github.com/flacito/webbs-5-things

---

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Reveal.js** for presentation slides
- **ReactMarkdown** with plugins:
  - `remark-gfm` - GitHub Flavored Markdown
  - `rehype-highlight` - Syntax highlighting
  - `rehype-raw` - HTML passthrough for custom tags
  - `rehype-slug` - Auto-generate heading IDs
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **GitHub Pages** for deployment

---

## File Structure

```
webbs-5-things/
├── public/
│   └── content.md              # Main presentation content
├── src/
│   ├── components/
│   │   ├── PresentationView.tsx  # Reveal.js slide renderer
│   │   └── Toolbar.tsx           # Liquid glass navigation bar
│   ├── App.tsx                   # Main app with reading mode
│   ├── index.css                 # Global styles + Reveal overrides
│   └── main.tsx                  # Entry point
├── prompts/
│   └── ARCHITECTURE.md           # This file
└── index.html                    # HTML entry with theme init script
```

---

## Custom HTML Tags

Custom tags are passed through ReactMarkdown via `rehype-raw` and styled in CSS.

### `<attention-getter-N>` (1-5)

Large text elements that don't create slide breaks. Font sizes descend from H1 equivalent:

| Tag | Font Size (Desktop) | Font Size (Mobile 768px) | Font Size (Mobile 480px) |
|-----|---------------------|--------------------------|--------------------------|
| `<attention-getter-1>` | 4rem | 2rem | 1.5rem |
| `<attention-getter-2>` | 2.75rem | 1.5rem | 1.25rem |
| `<attention-getter-3>` | 2rem | 1.25rem | 1.1rem |
| `<attention-getter-4>` | 1.5rem | 1.1rem | 1.1rem |
| `<attention-getter-5>` | 1.25rem | 1rem | 1rem |

**Usage in content.md:**
```markdown
<attention-getter-1>
13 weeks to 3 Days! Practice this and it's 1 day.
</attention-getter-1>
```

### `<slidebreak />`

Creates a new slide without requiring a heading. Useful for content continuation.

**Usage:**
```markdown
Some content on slide 1...

<slidebreak />

More content on slide 2 (no heading needed)
```

### `<appendix />`

Everything after this tag becomes a scrollable reading section within the presentation. The appendix slide has overflow-y: auto and reading-optimized typography.

**Usage:**
```markdown
## Last Regular Slide

Content here...

<appendix />

<attention-getter-1>Appendix</attention-getter-1>

All content here is in a scrollable section...
```

---

## Slide Parsing Logic

Located in `PresentationView.tsx`:

```typescript
interface ParsedContent {
  slides: Slide[];
  appendix: string | null;
}

function parseMarkdownToSlides(markdown: string): ParsedContent {
  // 1. Check for <appendix /> tag - split content
  const appendixMatch = markdown.match(/^<appendix\s*\/?>/im);

  // 2. Parse slides from remaining content
  // Slide breaks occur on:
  //   - # (H1) - creates new slide
  //   - ## (H2) - creates new slide
  //   - <slidebreak /> - creates new slide without heading
  // H3, H4, and everything else stays on current slide

  // 3. Optional: Combine slide ranges
  const combineRanges: [number, number][] = [
    [1, 2], // Combines slides 1-2 into one slide
  ];
}
```

---

## Theme System

Three modes: `dark`, `light`, `system`

### Implementation

1. **index.html** - Pre-render theme to avoid flash:
```html
<script>
  const theme = localStorage.getItem('theme') || 'system';
  const isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    document.documentElement.classList.add('dark');
  }
</script>
```

2. **App.tsx** - Theme state management:
```typescript
const [theme, setTheme] = useState<Theme>(() => {
  return (localStorage.getItem("theme") as Theme) || "system";
});

useEffect(() => {
  localStorage.setItem("theme", theme);
  const isDark = theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}, [theme]);
```

3. **CSS Variables** - Defined in `:root` and `html.dark`:
```css
:root {
  --gh-bg: #ffffff;
  --gh-text: #1f2328;
  --gh-heading: #3d2314;
  /* ... */
}

html.dark {
  --gh-bg: #0d1117;
  --gh-text: #e6edf3;
  --gh-heading: #f0f6fc;
  /* ... */
}
```

---

## View Modes

### Presentation Mode
- Full-screen Reveal.js slides
- Keyboard navigation (arrows, space)
- Progress bar and slide numbers
- Resets to slide 1 when entering from reading mode

### Reading Mode
- Scrollable article layout
- Sticky Table of Contents sidebar
- Intersection Observer for active heading tracking
- Auto-scroll ToC to keep active item visible

### Mode Switching
```typescript
useEffect(() => {
  localStorage.setItem("viewMode", mode);
  if (mode === "presentation") {
    window.location.hash = "#/0"; // Reset to first slide
  }
}, [mode]);
```

---

## Table of Contents

### Features
- Hierarchical structure (H2 sections with H3 children)
- Expandable/collapsible sections
- Active heading highlighting via Intersection Observer
- Auto-scroll to keep active item visible
- Persisted expand state in localStorage

### Auto-Scroll Implementation
```typescript
const scrollContainerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!activeId || !scrollContainerRef.current) return;

  const activeElement = scrollContainerRef.current.querySelector(
    `[data-toc-id="${activeId}"]`
  );
  if (activeElement) {
    activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}, [activeId]);
```

### Data Attributes
Each ToC item has `data-toc-id={headingId}` for targeting.

---

## Toolbar

### Components
1. **Theme Toggle** - Dark / System / Light buttons
2. **Mode Toggle** - Present / Read pill switcher
3. **Home Button** - Returns to slide 1 (presentation mode only)
4. **Seminar CTA** - mailto link for booking
5. **GitHub Link** - Fork me! tooltip, opens in new tab

### Liquid Glass Styling
```css
.liquid-glass {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

html.dark .liquid-glass {
  background: rgba(30, 30, 30, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## Mobile Responsive Design

### Breakpoints
- **768px** - Tablet/small laptop
- **480px** - Phone portrait

### Key Adjustments

#### Slide Padding
```css
/* Desktop */
.reveal .slides section { padding: 5rem 6rem 3rem 6rem; }

/* 768px */
.reveal .slides section { padding: 4rem 1.5rem 2rem 1.5rem !important; }

/* 480px */
.reveal .slides section { padding: 3.5rem 1rem 1.5rem 1rem !important; }
```

#### Typography Scaling
| Element | Desktop | 768px | 480px |
|---------|---------|-------|-------|
| H1 | 4rem | 2rem | 1.5rem |
| H2 (section) | 2.75rem | 1.75rem | 1.35rem |
| Paragraph | 1.1rem | 0.95rem | 0.85rem |
| List item | 0.95rem | 0.85rem | 0.8rem |

#### Toolbar Compaction
```css
/* 768px */
.liquid-glass { padding: 0.375rem 0.5rem; border-radius: 12px; }
.mode-toggle button { padding: 0.25rem 0.5rem; font-size: 0.7rem; }

/* 480px */
.liquid-glass { padding: 0.25rem 0.375rem; gap: 0.25rem; }
.liquid-glass-button svg { width: 14px; height: 14px; }
```

---

## Reveal.js Configuration

```typescript
const deck = new Reveal(deckRef.current, {
  hash: true,           // Enable URL hash navigation
  slideNumber: true,    // Show slide numbers
  progress: true,       // Show progress bar
  controls: true,       // Show navigation arrows
  center: true,         // Center slide content vertically
  transition: "slide",  // Slide transition effect
  backgroundTransition: "fade",
  width: 1280,
  height: 720,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,
  embedded: false,
});
```

---

## Appendix Section Styling

The appendix is a scrollable reading area within the presentation:

```css
.reveal .appendix-content {
  text-align: left;
  max-width: 48rem;
  margin: 0 auto;
  padding: 3rem 2rem;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--gh-border) transparent;
}

/* Parent section removes padding */
.reveal .slides section:has(.appendix-content) {
  padding: 0 !important;
  height: 100% !important;
  overflow: hidden !important;
}
```

---

## localStorage Keys

| Key | Values | Default | Purpose |
|-----|--------|---------|---------|
| `theme` | `dark`, `light`, `system` | `system` | Color theme preference |
| `viewMode` | `presentation`, `reading` | `presentation` | View mode preference |
| `tocVisible` | `true`, `false` | `true` | ToC visibility (reading mode) |
| `pinnedSections` | JSON array of IDs | `[]` | Manually expanded ToC sections |

---

## Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-markdown": "^9.x",
    "reveal.js": "^5.x",
    "remark-gfm": "^4.x",
    "rehype-highlight": "^7.x",
    "rehype-raw": "^7.x",
    "rehype-slug": "^6.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "tailwindcss": "^3.x",
    "@types/reveal.js": "^5.x"
  }
}
```

---

## Deployment

GitHub Pages via GitHub Actions. The site builds with Vite and deploys to `gh-pages` branch.

**Live URL:** https://flacito.github.io/webbs-5-things/

---

## Future Considerations

- Speaker notes support
- PDF export
- Search functionality
- Keyboard shortcuts overlay
- Print stylesheet
