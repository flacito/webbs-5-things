import { useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { ChevronDown } from "lucide-react";

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

  const scrollToSlide = useCallback((slideIndex: number) => {
    const slideElement = document.getElementById(`mobile-slide-${slideIndex}`);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="mobile-presentation">
      {slides.map((slide, i) => (
        <div
          key={i}
          id={`mobile-slide-${i}`}
          className={`mobile-slide ${slide.isAppendix ? "mobile-slide-appendix" : ""}`}
        >
          <div className="mobile-slide-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {slide.content}
            </ReactMarkdown>
          </div>
          {!slide.isAppendix && (
            <div className="mobile-slide-footer">
              <div className="mobile-slide-number">
                {i + 1} / {slides.length}
              </div>
              {i < slides.length - 1 && (
                <button
                  onClick={() => scrollToSlide(i + 1)}
                  className="mobile-slide-next"
                  aria-label="Next slide"
                >
                  <span>Next</span>
                  <ChevronDown size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
