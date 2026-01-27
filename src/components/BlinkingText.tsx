import { JSX, useEffect, useRef, useState, useMemo } from 'react';

interface BlinkingTextProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  duration?: number;
  stagger?: number;
}

const BlinkingText: React.FC<BlinkingTextProps> = ({
  text,
  tag = 'div',
  className = '',
  stagger = 1,
}) => {
  const [inView, setInView] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const ref = useRef<HTMLElement>(null);

  // Pre-calculate chunks (words vs whitespace) and their graphemes + global indices
  const wordChunks = useMemo(() => {
    const getGraphemes = (str: string) => {
      if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
        const segmenter = new (Intl as any).Segmenter('en', {
          granularity: 'grapheme',
        });
        return Array.from(segmenter.segment(str)).map((s: any) => s.segment);
      }
      return Array.from(str);
    };

    const parts = text.split(/(\s+)/);
    let globalIndexCounter = 0;

    return parts.map((part) => {
      const graphemes = getGraphemes(part);
      const isSpace = /^\s+$/.test(part);
      const chunkStartIndex = globalIndexCounter;
      globalIndexCounter += graphemes.length;

      return {
        text: part,
        isSpace,
        graphemes,
        startIndex: chunkStartIndex,
      };
    });
  }, [text]);

  // Use Intl.Segmenter to correctly split graphemes (like flags) for the delay generation source
  const characters = useMemo(() => {
    if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
      const segmenter = new (Intl as any).Segmenter('en', {
        granularity: 'grapheme',
      });
      return Array.from(segmenter.segment(text)).map((s: any) => s.segment);
    }
    return Array.from(text);
  }, [text]);

  useEffect(() => {
    const randomDelays = characters.map(() => Math.random() * stagger);
    setDelays(randomDelays);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [characters, stagger]);

  const CustomTag = tag as any;

  return (
    <CustomTag ref={ref} className={`${className} inline-block`}>
      {wordChunks.map((chunk, chunkIndex) => {
        // Wrap words (non-space chunks) to prevent breaking inside them
        // Use 'whitespace-nowrap' on the wrapper, and 'inline-block' on children
        const Wrapper = chunk.isSpace ? 'span' : 'span';
        const wrapperClass = chunk.isSpace
          ? ''
          : 'inline-block whitespace-nowrap';

        return (
          <Wrapper key={chunkIndex} className={wrapperClass}>
            {chunk.graphemes.map((char, charOffset) => {
              const globalIndex = chunk.startIndex + charOffset;
              return (
                <span
                  key={charOffset}
                  className={`inline-block whitespace-pre ${
                    inView ? 'animate-blink-reveal' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay:
                      inView && delays[globalIndex]
                        ? `${delays[globalIndex]}s`
                        : '0s',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </CustomTag>
  );
};

export default BlinkingText;
