import { useMemo, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { ChevronDown } from "lucide-react";
import { SeminarCTA } from "./SeminarCTA";

interface Slide {
  content: string;
  isAppendix?: boolean;
}

function parseMarkdownToSlides(markdown: string): Slide[] {
  // Check for <appendix /> tag
  const appendixMatch = markdown.match(/^<appendix\s*\/?>/im);
  let slideMarkdown = markdown;
  let appendixContent: string | null = null;

  if (appendixMatch && appendixMatch.index !== undefined) {
    slideMarkdown = markdown.slice(0, appendixMatch.index);
    appendixContent = markdown.slice(appendixMatch.index + appendixMatch[0].length).trim();
  }

  // Split on # (h1), ## (h2), and <slidebreak />
  const lines = slideMarkdown.split("\n");
  const slides: Slide[] = [];
  let currentContent: string[] = [];

  const flushSlide = () => {
    const content = currentContent.join("\n").trim();
    if (content) {
      slides.push({ content });
    }
    currentContent = [];
  };

  for (const line of lines) {
    // Check for h1 (title slide) - new slide
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      flushSlide();
      currentContent.push(line);
    }
    // Check for h2 (main section) - new slide
    else if (line.startsWith("## ")) {
      flushSlide();
      currentContent.push(line);
    }
    // Check for <slidebreak /> marker - new slide without heading
    else if (line.trim().match(/^<slidebreak\s*\/?>/i)) {
      flushSlide();
    }
    // Everything else stays on current slide
    else {
      currentContent.push(line);
    }
  }

  // Don't forget the last slide
  flushSlide();

  // Add appendix as final slide if it exists
  if (appendixContent) {
    slides.push({ content: appendixContent, isAppendix: true });
  }

  return slides;
}

interface MobilePresentationViewProps {
  content: string;
}

export function MobilePresentationView({ content }: MobilePresentationViewProps) {
  const slides = useMemo(() => parseMarkdownToSlides(content), [content]);
  const [showArrow, setShowArrow] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Arrow indicator: show after 5s, pulse for 3s, repeat until scroll
  useEffect(() => {
    if (hasScrolled) return;

    let timeoutId: number;
    const startCycle = () => {
      // Wait 5 seconds, then show arrow for 3 seconds
      timeoutId = window.setTimeout(() => {
        if (!hasScrolled) {
          setShowArrow(true);
          timeoutId = window.setTimeout(() => {
            setShowArrow(false);
            // Restart the cycle
            startCycle();
          }, 3000);
        }
      }, 5000);
    };

    startCycle();
    return () => window.clearTimeout(timeoutId);
  }, [hasScrolled]);

  // Hide indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mobile-presentation">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`mobile-slide ${slide.isAppendix ? "mobile-slide-appendix" : ""}`}
        >
          <div className="mobile-slide-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {slide.content}
            </ReactMarkdown>
            {i === 0 && (
              <div className="seminar-cta-wrapper">
                <SeminarCTA />
              </div>
            )}
          </div>
        </div>
      ))}
      {/* Scroll indicator - text always visible, arrow appears on timer */}
      {!hasScrolled && (
        <div className={`scroll-indicator ${showArrow ? "with-arrow" : ""}`}>
          <span className="scroll-indicator-text">Scroll down...</span>
          {showArrow && (
            <ChevronDown size={24} className="scroll-indicator-arrow" />
          )}
        </div>
      )}
    </div>
  );
}
