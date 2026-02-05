import { useState, useEffect, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";

type Theme = "dark" | "light" | "system";

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gh-border overflow-hidden bg-gh-bg-secondary">
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 transition-colors ${
          theme === "dark"
            ? "bg-gh-accent text-white"
            : "text-gh-text hover:bg-gh-border/50"
        }`}
        title="Dark mode"
      >
        <Moon size={16} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 transition-colors ${
          theme === "system"
            ? "bg-gh-accent text-white"
            : "text-gh-text hover:bg-gh-border/50"
        }`}
        title="System preference"
      >
        <Monitor size={16} />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`p-2 transition-colors ${
          theme === "light"
            ? "bg-gh-accent text-white"
            : "text-gh-text hover:bg-gh-border/50"
        }`}
        title="Light mode"
      >
        <Sun size={16} />
      </button>
    </div>
  );
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TocSection {
  item: TocItem;
  children: TocItem[];
}

function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, title, level });
  }

  return items;
}

function groupTocItems(items: TocItem[]): TocSection[] {
  const sections: TocSection[] = [];
  let currentSection: TocSection | null = null;

  for (const item of items) {
    if (item.level <= 2) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = { item, children: [] };
    } else if (currentSection) {
      currentSection.children.push(item);
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function TableOfContents({
  sections,
  activeId,
  expandedSections,
  onToggleSection,
  onClose,
  isVisible,
  onToggleVisible,
}: {
  sections: TocSection[];
  activeId: string;
  expandedSections: Set<string>;
  onToggleSection: (id: string) => void;
  onClose?: () => void;
  isVisible?: boolean;
  onToggleVisible?: () => void;
}) {
  return (
    <nav className="toc">
      {onToggleVisible ? (
        <button
          onClick={onToggleVisible}
          className="flex items-center gap-2 w-full text-left px-3 mb-2 text-gh-heading hover:text-gh-link transition-colors"
        >
          <ChevronRight
            size={18}
            className={`transform transition-transform duration-300 ${
              isVisible ? "rotate-90" : ""
            }`}
          />
          <span className="text-lg font-semibold">Contents</span>
        </button>
      ) : (
        <h3 className="text-lg font-semibold text-gh-heading mb-4 px-3">
          Contents
        </h3>
      )}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isVisible === false
            ? "max-h-0 opacity-0 overflow-hidden"
            : "max-h-[60vh] opacity-100 overflow-y-auto"
        }`}
      >
        <ul className="space-y-0.5 mt-2">
          {sections.map((section) => {
            const isExpanded = expandedSections.has(section.item.id);
            const isActive = activeId === section.item.id;
            const hasActiveChild = section.children.some(
              (child) => child.id === activeId,
            );
            const shouldHighlight = isActive || hasActiveChild;

            return (
              <li key={section.item.id}>
                <div className="flex items-start">
                  {section.children.length > 0 && (
                    <button
                      onClick={() => onToggleSection(section.item.id)}
                      className="p-1 mt-0.5 text-gh-text hover:text-gh-link transition-colors"
                      aria-label={
                        isExpanded ? "Collapse section" : "Expand section"
                      }
                    >
                      <ChevronRight
                        size={14}
                        className={`transform transition-transform duration-200 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  )}
                  <a
                    href={`#${section.item.id}`}
                    onClick={onClose}
                    className={`toc-link flex-1 ${shouldHighlight ? "active" : ""} ${
                      !section.children.length ? "ml-5" : ""
                    }`}
                  >
                    {section.item.title}
                  </a>
                </div>

                {/* Children with animation */}
                <div
                  className={`toc-children overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="ml-5 mt-0.5 space-y-0.5 border-l border-gh-border pl-2">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          onClick={onClose}
                          className={`toc-link text-sm ${activeId === child.id ? "active" : ""}`}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// Custom heading components with anchor links
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id?: string;
  children?: React.ReactNode;
}

function HeadingWithAnchor({
  level,
  children,
  id,
  ...props
}: HeadingProps & { level: number }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (id) {
      window.history.pushState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const iconSize = level === 1 ? 20 : level === 2 ? 18 : 16;
  const headingContent = (
    <>
      {children}
      {id && (
        <a
          href={`#${id}`}
          onClick={handleClick}
          className="anchor-link ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center text-gh-link"
          aria-label="Link to this section"
        >
          <LinkIcon size={iconSize} />
        </a>
      )}
    </>
  );

  switch (level) {
    case 1:
      return (
        <h1 id={id} className="group" {...props}>
          {headingContent}
        </h1>
      );
    case 2:
      return (
        <h2 id={id} className="group" {...props}>
          {headingContent}
        </h2>
      );
    case 3:
      return (
        <h3 id={id} className="group" {...props}>
          {headingContent}
        </h3>
      );
    case 4:
      return (
        <h4 id={id} className="group" {...props}>
          {headingContent}
        </h4>
      );
    default:
      return (
        <h2 id={id} className="group" {...props}>
          {headingContent}
        </h2>
      );
  }
}

const headingComponents = {
  h1: (props: HeadingProps) => <HeadingWithAnchor level={1} {...props} />,
  h2: (props: HeadingProps) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props: HeadingProps) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props: HeadingProps) => <HeadingWithAnchor level={4} {...props} />,
};

function App() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const tocSections = useMemo(() => groupTocItems(tocItems), [tocItems]);
  const [activeId, setActiveId] = useState("");
  const [prevActiveSection, setPrevActiveSection] = useState<string | null>(
    null,
  );
  const [pinnedSections, setPinnedSections] = useState<Set<string>>(new Set());
  const [autoExpandedSection, setAutoExpandedSection] = useState<string | null>(
    null,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tocVisible, setTocVisible] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tocVisible");
      return saved === null ? false : saved === "true";
    }
    return false;
  });
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      return saved || "system";
    }
    return "system";
  });

  // Fetch markdown content
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content.md`)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setTocItems(extractToc(text));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load content:", err);
        setLoading(false);
      });
  }, []);

  // Save ToC visibility to localStorage
  useEffect(() => {
    localStorage.setItem("tocVisible", String(tocVisible));
  }, [tocVisible]);

  // Combined expanded sections = pinned + auto-expanded
  const expandedSections = useMemo(() => {
    const combined = new Set(pinnedSections);
    if (autoExpandedSection) {
      combined.add(autoExpandedSection);
    }
    return combined;
  }, [pinnedSections, autoExpandedSection]);

  // Apply theme and listen for system changes
  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Save theme preference
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  // Find which section contains the active heading
  const getParentSectionId = useCallback(
    (headingId: string): string | null => {
      for (const section of tocSections) {
        if (section.item.id === headingId) {
          return section.item.id;
        }
        if (section.children.some((child) => child.id === headingId)) {
          return section.item.id;
        }
      }
      return null;
    },
    [tocSections],
  );

  // Auto-expand current section, collapse previous if not pinned
  useEffect(() => {
    const currentSectionId = getParentSectionId(activeId);

    if (currentSectionId !== prevActiveSection) {
      setAutoExpandedSection(currentSectionId);
      setPrevActiveSection(currentSectionId);
    }
  }, [activeId, getParentSectionId, prevActiveSection]);

  // User manually toggles a section - this pins/unpins it
  const handleToggleSection = useCallback((id: string) => {
    setPinnedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Intersection observer for active heading
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    const headings = document.querySelectorAll(
      ".markdown-content h1, .markdown-content h2, .markdown-content h3",
    );
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gh-bg flex items-center justify-center">
        <div className="text-gh-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gh-bg">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gh-bg-secondary border-b border-gh-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-gh-heading">
            Webb's 5 Things
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gh-text hover:text-gh-link transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed top-[57px] right-0 bottom-0 w-80 max-w-[80vw] z-50 bg-gh-bg-secondary border-l border-gh-border transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 overflow-y-auto h-full">
          <TableOfContents
            sections={tocSections}
            activeId={activeId}
            expandedSections={expandedSections}
            onToggleSection={handleToggleSection}
            onClose={() => setMobileMenuOpen(false)}
          />
        </div>
      </aside>

      <div className="lg:flex max-w-7xl mx-auto">
        {/* Desktop sidebar with toggle */}
        <aside className="hidden lg:block flex-shrink-0 w-72 py-8 pl-4">
          <div className="sticky top-8">
            {/* Theme toggle above */}
            <div className="mb-3">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>

            {/* Seminar callout */}
            <a
              href="mailto:brian@kingslandacademy.com?subject=Webb's 5 Things Seminar"
              className="block mb-4 p-3 text-xs bg-gh-bg-secondary/50 border border-gh-border rounded-lg hover:border-gh-link transition-colors"
            >
              <p className="font-medium text-gh-heading mb-1">
                5 Things Seminar
              </p>
              <p className="text-gh-text/70">
                Full-day mentoring: context to launch in 1-3 sessions in ONE
                DAY. $7k/day.
              </p>
            </a>

            {/* ToC with integrated toggle */}
            <TableOfContents
              sections={tocSections}
              activeId={activeId}
              expandedSections={expandedSections}
              onToggleSection={handleToggleSection}
              isVisible={tocVisible}
              onToggleVisible={() => setTocVisible(!tocVisible)}
            />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 pt-[57px] lg:pt-0 lg:pl-4">
          <article className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
              components={headingComponents}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* Footer */}
          <footer className="border-t border-gh-border py-8 mt-16 text-center text-sm text-gh-text/60">
            <p>© 2026 Brian Webb. All rights reserved.</p>
            <p className="mt-2">
              <a
                href="mailto:brian@kingslandacademy.com"
                className="text-gh-link hover:underline"
              >
                brian@kingslandacademy.com
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
