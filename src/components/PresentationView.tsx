import { useEffect, useRef, useMemo } from "react";
import Reveal from "reveal.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "reveal.js/dist/reveal.css";
import { SeminarCTA } from "./SeminarCTA";

interface Slide {
  content: string;
  children: string[];
}

interface ParsedContent {
  slides: Slide[];
  appendix: string | null;
}

function parseMarkdownToSlides(markdown: string): ParsedContent {
  // Check for <appendix /> tag - everything after becomes scrollable content
  const appendixMatch = markdown.match(/^<appendix\s*\/?>/im);
  let slideMarkdown = markdown;
  let appendixContent: string | null = null;

  if (appendixMatch && appendixMatch.index !== undefined) {
    slideMarkdown = markdown.slice(0, appendixMatch.index);
    appendixContent = markdown.slice(appendixMatch.index + appendixMatch[0].length).trim();
  }

  // Slide breaks on: # (h1), ## (h2) only
  // h3 (###), h4 (####) and everything else stays on current slide
  const lines = slideMarkdown.split("\n");
  const slides: Slide[] = [];
  let currentSlide: Slide | null = null;
  let buffer: string[] = [];

  const flushBuffer = () => {
    if (buffer.length > 0 && currentSlide) {
      currentSlide.content += "\n" + buffer.join("\n");
      buffer = [];
    }
  };

  const flushSlide = () => {
    flushBuffer();
    if (currentSlide) {
      slides.push(currentSlide);
    }
  };

  for (const line of lines) {
    // Check for h1 (title slide) - new slide
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      flushSlide();
      currentSlide = { content: line, children: [] };
    }
    // Check for h2 (main section) - new slide
    else if (line.startsWith("## ")) {
      flushSlide();
      currentSlide = { content: line, children: [] };
    }
    // Check for <slidebreak /> marker - new slide without heading
    else if (line.trim().match(/^<slidebreak\s*\/?>/i)) {
      flushSlide();
      currentSlide = { content: "", children: [] };
    }
    // h3, h4, and everything else stays on current slide
    else {
      buffer.push(line);
    }
  }

  // Don't forget the last slide
  flushSlide();

  // Optional: Combine slide ranges (process in reverse order to preserve indices)
  // Format: [startIndex, endIndex] (1-based, inclusive)
  // Example: [1, 3] combines slides 1, 2, 3 into one slide
  const combineRanges: [number, number][] = [
    // Add ranges here as needed, e.g.:
    [1, 2], // Combine slides 1-2
  ];

  for (const [start, end] of combineRanges) {
    const startIdx = start - 1; // Convert to 0-based
    const count = end - start + 1;

    if (slides.length >= end) {
      const toMerge = slides.slice(startIdx, startIdx + count);
      const combinedContent = toMerge.map((s) => s.content).join("\n\n---\n\n");
      const combinedChildren = toMerge.flatMap((s) => s.children);

      slides.splice(startIdx, count, {
        content: combinedContent,
        children: combinedChildren,
      });
    }
  }

  return { slides, appendix: appendixContent };
}

interface PresentationViewProps {
  content: string;
}

export function PresentationView({ content }: PresentationViewProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<Reveal.Api | null>(null);

  const { slides, appendix } = useMemo(() => parseMarkdownToSlides(content), [content]);

  useEffect(() => {
    if (!deckRef.current) return;

    // Destroy existing instance if any
    if (revealRef.current) {
      revealRef.current.destroy();
      revealRef.current = null;
    }

    const deck = new Reveal(deckRef.current, {
      hash: true,
      slideNumber: true,
      progress: true,
      controls: true,
      center: true,
      transition: "slide",
      backgroundTransition: "fade",
      width: 1280,
      height: 720,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
      embedded: false,
    });

    deck.initialize().then(() => {
      revealRef.current = deck;
    });

    return () => {
      if (revealRef.current) {
        revealRef.current.destroy();
        revealRef.current = null;
      }
    };
  }, [slides]);

  return (
    <div
      className="reveal reveal-viewport"
      ref={deckRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="slides">
        {slides.map((slide, i) => (
          <section key={i} data-auto-animate>
            <div className="slide-content text-left max-w-5xl mx-auto px-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {slide.content}
              </ReactMarkdown>
            </div>
            {i === 0 && (
              <div className="seminar-cta-wrapper">
                <SeminarCTA />
              </div>
            )}
          </section>
        ))}
        {/* Appendix: scrollable reading section */}
        {appendix && (
          <section data-auto-animate>
            <div className="appendix-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {appendix}
              </ReactMarkdown>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
