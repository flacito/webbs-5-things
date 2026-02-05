# Claude Code Prompt: Build Webb's 5 Things GitHub Pages Site

## Context

I have a markdown document (`webbs-5-things-for-ai-v2.md`) that explains my methodology for building software 50x faster using AI collaboration. I need you to:

1. Create a professional GitHub Pages site from this markdown
2. Set up the git repository properly
3. Make it ready to deploy immediately

## Requirements

### 1. Convert Markdown to Beautiful HTML

**Input:** `/home/claude/webbs-5-things-for-ai-v2.md`

**Output:** Create `index.html` with:

- **Dark GitHub-style theme** (similar to GitHub's dark mode)
- **Fully responsive** (mobile-friendly)
- **Zero dependencies** (pure HTML/CSS, no frameworks)
- **Semantic HTML5** structure
- **Smooth scrolling** navigation
- **Syntax highlighting** for code blocks
- **Professional typography**

**Color Scheme:**
```css
--bg: #0d1117;
--text: #c9d1d9;
--heading: #58a6ff;
--accent: #1f6feb;
--code-bg: #161b22;
--border: #30363d;
--link: #58a6ff;
--green: #3fb950;
--yellow: #d29922;
--red: #f85149;
```

**Special Styling:**
- Highlight boxes for key insights (blue border-left)
- Principle boxes for the 5 main sections (green border-left, green headings)
- Warning boxes if needed (red border-left)
- Comparison grids for good/bad examples (2-column on desktop, 1-column mobile)
- Sticky table of contents with jump links
- Proper spacing and breathing room

### 2. Create Supporting Files

**README.md:**
```markdown
# Webb's 5 Things for AI

A methodology for building software 50x faster with higher quality using AI collaboration.

## Live Site

https://YOUR_USERNAME.github.io/webbs-5-things/

## Deploying

1. Fork this repository
2. Enable GitHub Pages in Settings → Pages
3. Select `main` branch as source
4. Your site will be live in 1-2 minutes

## Local Development

```bash
python -m http.server 8000
# Open http://localhost:8000
```

## Author

Brian Webb  
Software Consultant  
brian@kingslandacademy.com

## License

© 2026 Brian Webb. All rights reserved.
```

**DEPLOYMENT.md:**
- Step-by-step instructions for deploying to GitHub Pages
- Screenshots or clear descriptions of each step
- Troubleshooting section
- Custom domain setup (optional)

### 3. Git Repository Setup

Create the repository structure in `/home/claude/webbs-5-things-gh-pages/`:

```
webbs-5-things-gh-pages/
├── index.html
├── README.md
├── DEPLOYMENT.md
└── .git/
```

**Initialize git properly:**
```bash
git init
git branch -m main
git config user.email "brian@kingslandacademy.com"
git config user.name "Brian Webb"
git add .
git commit -m "Initial commit: Webb's 5 Things for AI"
```

### 4. Copy to Outputs

Copy the complete directory to `/mnt/user-data/outputs/` so I can download it.

## Conversion Guidelines

### Markdown to HTML Mapping

**Headers:**
- `# Title` → `<h1>` in header section
- `## Section` → `<h2 id="section">` with anchor
- `### Subsection` → `<h3>`
- `#### Detail` → `<h4>`

**Special Blocks:**
- Bold text starting a paragraph → `<strong>` with green color
- Italic emphasis → `<em>` with yellow color
- Code blocks with language → `<pre><code>` with proper escaping
- Inline code → `<code>` with dark background

**Lists:**
- Preserve all bullet points and numbering
- Maintain indentation for nested lists
- Keep list items readable with proper spacing

**Comparisons:**
When you see "Bad approach:" followed by "Good approach:", create a 2-column comparison grid:
```html
<div class="comparison">
    <div class="comparison-item bad">
        <h4>❌ Bad approach:</h4>
        <pre><code>...</code></pre>
    </div>
    <div class="comparison-item good">
        <h4>✅ Good approach:</h4>
        <pre><code>...</code></pre>
    </div>
</div>
```

**Tables:**
Convert markdown tables to proper HTML tables with styled headers.

### Table of Contents

Create a sticky TOC at the top with these sections:
- Introduction
- 1. Bring Yourself to This
- 2. Start at High Level ALWAYS
- 3. Have a Design Session with Claude
- 4. Go Big
- 5. Go Big with Rails
- Putting It All Together
- Common Objections
- Raising Up Masters (this is the mentorship section)
- Conclusion
- Getting Started
- Case Study

Each link should jump to the proper section with smooth scrolling.

### The 5 Principles

Each of the 5 main principles should be wrapped in a `.principle` div with:
- Green left border (4px solid var(--green))
- Light green background (rgba(63, 185, 80, 0.1))
- Green headings
- Extra padding (1.5rem)

### Highlight Boxes

Key insights should be in `.highlight-box` divs with:
- Blue left border
- Blue-tinted background
- Used for "The Core Insight", "This is exactly how transformer models work", etc.

## Quality Checklist

Before finishing, verify:

- ✅ All markdown content is converted (no missing sections)
- ✅ Code blocks are properly escaped (no broken HTML)
- ✅ Links work (including anchor links in TOC)
- ✅ Mobile responsive (test mental model: looks good on phone)
- ✅ Dark theme is consistent throughout
- ✅ All 5 principles are styled as principle boxes
- ✅ Typography is readable (line-height, font-sizes)
- ✅ Git repository is properly initialized
- ✅ Files copied to /mnt/user-data/outputs/

## Meta Note

This prompt itself demonstrates the methodology:

1. **Bring yourself** - I explained my context and goals
2. **Start high level** - I defined what success looks like
3. **Design session** - This prompt IS the design session
4. **Go big** - Build the complete site, not a prototype
5. **Rails** - Clear constraints (dark theme, zero deps, specific structure)

Now execute with velocity and ship something I can deploy TODAY.
