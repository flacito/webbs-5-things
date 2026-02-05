import { useState } from "react";
import { Sun, Moon, Monitor, BookOpen, Presentation, Mail, Home, Github } from "lucide-react";
import { SeminarModal } from "./SeminarModal";

type Theme = "dark" | "light" | "system";
type ViewMode = "presentation" | "reading";

interface ToolbarProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
  isSticky?: boolean; // When true, don't use fixed positioning (parent handles sticky)
}

export function Toolbar({ theme, setTheme, mode, setMode, isSticky = false }: ToolbarProps) {
  const [showSeminarModal, setShowSeminarModal] = useState(false);

  const goHome = () => {
    // Navigate to first slide in Reveal.js
    window.location.hash = '#/0';
  };

  const positionClasses = isSticky
    ? "" // Parent handles positioning
    : "fixed top-4 left-1/2 -translate-x-1/2";

  return (
    <>
    <div className={`toolbar-container ${positionClasses} z-50 liquid-glass px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-3`}>
      {/* Theme toggle */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <button
          onClick={() => setTheme("dark")}
          className={`liquid-glass-button p-1.5 sm:p-2 ${theme === "dark" ? "active" : ""}`}
          title="Dark mode"
        >
          <Moon className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`liquid-glass-button p-1.5 sm:p-2 hidden xs:block ${theme === "system" ? "active" : ""}`}
          title="System preference"
        >
          <Monitor className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() => setTheme("light")}
          className={`liquid-glass-button p-1.5 sm:p-2 ${theme === "light" ? "active" : ""}`}
          title="Light mode"
        >
          <Sun className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-5 sm:h-6 bg-gh-border/50" />

      {/* Mode toggle */}
      <div className="mode-toggle">
        <button
          onClick={() => setMode("presentation")}
          className={mode === "presentation" ? "active" : ""}
          title="Presentation mode"
        >
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Presentation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Present</span>
          </span>
        </button>
        <button
          onClick={() => setMode("reading")}
          className={mode === "reading" ? "active" : ""}
          title="Reading mode"
        >
          <span className="flex items-center gap-1 sm:gap-1.5">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Read</span>
          </span>
        </button>
      </div>

      {/* Home button - only in presentation mode */}
      {mode === "presentation" && (
        <>
          <div className="w-px h-5 sm:h-6 bg-gh-border/50" />
          <button
            onClick={goHome}
            className="liquid-glass-button p-1.5 sm:p-2"
            title="Go to first slide (Home)"
          >
            <Home className="w-4 h-4 sm:w-4 sm:h-4" />
          </button>
        </>
      )}

      {/* Divider - hidden on very small screens */}
      <div className="w-px h-5 sm:h-6 bg-gh-border/50 hidden xs:block" />

      {/* Seminar callout */}
      <button
        onClick={() => setShowSeminarModal(true)}
        className="liquid-glass-button p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 text-sm font-medium hover:text-gh-link transition-colors"
        title="Book a seminar"
      >
        <Mail className="w-4 h-4 sm:w-4 sm:h-4" />
        <span className="hidden md:inline">$7k Seminar</span>
      </button>

      {/* Divider - hidden on small screens */}
      <div className="w-px h-5 sm:h-6 bg-gh-border/50 hidden sm:block" />

      {/* GitHub repo link - hidden on very small screens */}
      <a
        href="https://github.com/flacito/webbs-5-things"
        target="_blank"
        rel="noopener noreferrer"
        className="liquid-glass-button p-1.5 sm:p-2 hover:text-gh-link transition-colors hidden xs:flex"
        title="Fork me!"
      >
        <Github className="w-4 h-4 sm:w-4 sm:h-4" />
      </a>
    </div>

    <SeminarModal
      isOpen={showSeminarModal}
      onClose={() => setShowSeminarModal(false)}
    />
    </>
  );
}
