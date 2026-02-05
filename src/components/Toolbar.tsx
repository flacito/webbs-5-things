import { Sun, Moon, Monitor, BookOpen, Presentation, Mail, Home, Github } from "lucide-react";

type Theme = "dark" | "light" | "system";
type ViewMode = "presentation" | "reading";

interface ToolbarProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
}

export function Toolbar({ theme, setTheme, mode, setMode }: ToolbarProps) {
  const goHome = () => {
    // Navigate to first slide in Reveal.js
    window.location.hash = '#/0';
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 liquid-glass px-3 py-2 flex items-center gap-3">
      {/* Theme toggle */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setTheme("dark")}
          className={`liquid-glass-button p-2 ${theme === "dark" ? "active" : ""}`}
          title="Dark mode"
        >
          <Moon size={16} />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`liquid-glass-button p-2 ${theme === "system" ? "active" : ""}`}
          title="System preference"
        >
          <Monitor size={16} />
        </button>
        <button
          onClick={() => setTheme("light")}
          className={`liquid-glass-button p-2 ${theme === "light" ? "active" : ""}`}
          title="Light mode"
        >
          <Sun size={16} />
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gh-border/50" />

      {/* Mode toggle */}
      <div className="mode-toggle">
        <button
          onClick={() => setMode("presentation")}
          className={mode === "presentation" ? "active" : ""}
          title="Presentation mode"
        >
          <span className="flex items-center gap-1.5">
            <Presentation size={14} />
            <span className="hidden sm:inline">Present</span>
          </span>
        </button>
        <button
          onClick={() => setMode("reading")}
          className={mode === "reading" ? "active" : ""}
          title="Reading mode"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} />
            <span className="hidden sm:inline">Read</span>
          </span>
        </button>
      </div>

      {/* Home button - only in presentation mode */}
      {mode === "presentation" && (
        <>
          <div className="w-px h-6 bg-gh-border/50" />
          <button
            onClick={goHome}
            className="liquid-glass-button p-2"
            title="Go to first slide (Home)"
          >
            <Home size={16} />
          </button>
        </>
      )}

      {/* Divider */}
      <div className="w-px h-6 bg-gh-border/50" />

      {/* Seminar callout */}
      <a
        href="mailto:brian@kingslandacademy.com?subject=Webb's 5 Things Seminar"
        className="liquid-glass-button flex items-center gap-2 text-sm font-medium hover:text-gh-link transition-colors"
        title="Book a seminar"
      >
        <Mail size={14} />
        <span className="hidden md:inline">$7k Seminar</span>
      </a>

      {/* Divider */}
      <div className="w-px h-6 bg-gh-border/50" />

      {/* GitHub repo link */}
      <a
        href="https://github.com/flacito/webbs-5-things"
        target="_blank"
        rel="noopener noreferrer"
        className="liquid-glass-button p-2 hover:text-gh-link transition-colors"
        title="Fork me!"
      >
        <Github size={16} />
      </a>
    </div>
  );
}
