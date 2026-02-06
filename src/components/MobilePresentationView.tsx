import { useMemo, useState, useEffect, useRef } from "react";
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
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      flushSlide();
      currentContent.push(line);
    } else if (line.startsWith("## ")) {
      flushSlide();
      currentContent.push(line);
    } else if (line.trim().match(/^<slidebreak\s*\/?>/i)) {
      flushSlide();
    } else {
      currentContent.push(line);
    }
  }

  flushSlide();

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track current slide with Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setCurrentSlide(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6, // Slide is "current" when 60% visible
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [slides.length]);

  // Detect first interaction (scroll or touch)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasInteracted) return;

    const handleInteraction = () => {
      setHasInteracted(true);
    };

    container.addEventListener("scroll", handleInteraction, { passive: true, once: true });
    container.addEventListener("touchstart", handleInteraction, { passive: true, once: true });

    return () => {
      container.removeEventListener("scroll", handleInteraction);
      container.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasInteracted]);

  const scrollToSlide = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // Only show regular slides in the progress dots (not appendix)
  const mainSlides = slides.filter(s => !s.isAppendix);

  return (
    <div className="mobile-snap-container" ref={containerRef}>
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => (slideRefs.current[i] = el)}
          className={`mobile-snap-slide ${slide.isAppendix ? "mobile-snap-slide-appendix" : ""}`}
        >
          <div className="mobile-snap-content">
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

      {/* Progress dots - fixed on right side */}
      <div className="mobile-progress-dots">
        {mainSlides.map((_, i) => (
          <button
            key={i}
            className={`mobile-progress-dot ${i === currentSlide ? "active" : ""}`}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint - only on first slide before interaction */}
      {currentSlide === 0 && !hasInteracted && (
        <div className="mobile-scroll-hint">
          <span>Swipe up</span>
          <ChevronDown size={20} />
        </div>
      )}
    </div>
  );
}
