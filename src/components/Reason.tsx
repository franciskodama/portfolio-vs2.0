'use client';

import {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Reason = () => {
  const originalMessageBright =
    'this portfolio has been built to showcase my wide variety of skills from creativity to code.';
  const originalMessageDark =
    'please take your time to discover what makes my work unique.';

  const [gridItems, setGridItems] = useState<any[]>([]);
  const [columns, setColumns] = useState(12);
  const gridRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const brightClasses =
    'reason__reveal-bright reason__reveal-item border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[0.9rem] bg-dark relative opacity-0 -translate-x-[100px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]';

  const darkClasses =
    'reason__reveal-dark reason__reveal-item border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[0.9rem] bg-dark text-third relative opacity-0 translate-x-[100px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]';

  const calculateLayout = useCallback(() => {
    if (!gridRef.current || !measureRef.current) return;

    // Use getBoundingClientRect for precise fractional values
    const containerWidth = gridRef.current.getBoundingClientRect().width - 10; // -10px safety buffer
    const itemWidth = measureRef.current.getBoundingClientRect().width;
    // Get computed gap to be precise
    const style = window.getComputedStyle(gridRef.current);
    const gap = parseFloat(style.gap) || 0;

    // Calculate effective columns
    // width = n * item + (n-1) * gap
    // width + gap = n * (item + gap)
    const totalItemWidth = itemWidth + gap;
    let columns = Math.floor((containerWidth + gap) / totalItemWidth);

    // Ensure we have at least 12 columns to fit words like 'portfolio' and 'creativity'
    if (columns < 12) columns = 12;

    if (columns <= 0) return;

    const newItems: any[] = [];
    let newLinesCount = 0;

    const processWords = (
      text: string,
      type: 'bright' | 'dark',
      className: string
    ) => {
      return text.split(' ').map((word) => ({
        text: word,
        type,
        className,
        length: word.length,
      }));
    };

    const brightWords = processWords(
      originalMessageBright,
      'bright',
      brightClasses
    );
    const darkWords = processWords(originalMessageDark, 'dark', darkClasses);
    const allWords = [...brightWords, ...darkWords];

    // Build lines
    let currentLine: any[] = [];
    let currentLineLength = 0;

    const finalizeLine = (
      line: any[],
      lineWordsLength: number,
      lineIndex: number
    ) => {
      if (line.length === 0) return;

      const remaining = Math.max(0, columns - lineWordsLength);
      const padLeft = Math.floor(remaining / 2);
      const padRight = Math.max(0, remaining - padLeft);

      // Add Left Fillers
      for (let i = 0; i < padLeft; i++) {
        const fillerClass = line[0]?.className || brightClasses;
        newItems.push({
          char: '',
          type: 'filler',
          className: fillerClass,
          key: `filler-l-${newItems.length}`,
          lineIndex,
        });
      }

      // Add Content
      line.forEach((item) => {
        if (item.isSpace) {
          newItems.push({
            char: ' ',
            type: item.type,
            className: item.className,
            key: `space-${newItems.length}`,
            lineIndex,
          });
        } else {
          for (let char of item.text) {
            newItems.push({
              char,
              type: item.type,
              className: item.className,
              key: `char-${newItems.length}`,
              lineIndex,
            });
          }
        }
      });

      // Add Right Fillers
      for (let i = 0; i < padRight; i++) {
        const fillerClass = line[line.length - 1]?.className || brightClasses;
        newItems.push({
          char: '',
          type: 'filler',
          className: fillerClass,
          key: `filler-r-${newItems.length}`,
          lineIndex,
        });
      }
    };

    allWords.forEach((wordObj, index) => {
      // Determine if we need a space before this word
      const needsSpace = index > 0;
      const spaceCost = needsSpace ? 1 : 0;
      const wordCost = wordObj.length;

      if (currentLineLength + spaceCost + wordCost <= columns) {
        if (needsSpace) {
          currentLine.push({
            isSpace: true,
            type: wordObj.type,
            className: wordObj.className,
          });
          currentLineLength += 1;
        }
        currentLine.push(wordObj);
        currentLineLength += wordCost;
      } else {
        finalizeLine(currentLine, currentLineLength, newLinesCount);
        newLinesCount++;
        currentLine = [wordObj];
        currentLineLength = wordCost;
      }
    });

    finalizeLine(currentLine, currentLineLength, newLinesCount);

    setGridItems(newItems);
    setColumns(columns);
  }, []);

  useLayoutEffect(() => {
    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [calculateLayout]);

  useEffect(() => {
    if (gridItems.length === 0) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.reason__reveal-item') as HTMLElement[];
      const lines: { [key: number]: HTMLElement[] } = {};

      items.forEach((item) => {
        const lineIdx = parseInt(item.getAttribute('data-line') || '0');
        if (!lines[lineIdx]) lines[lineIdx] = [];
        lines[lineIdx].push(item);
      });

      Object.values(lines).forEach((lineItems) => {
        gsap.to(lineItems, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.02,
          scrollTrigger: {
            trigger: lineItems[0],
            start: 'top 85%',
            toggleActions: 'restart none none reset',
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [gridItems]);

  return (
    <section
      className='section flex flex-col max-w-[85em]  mx-auto'
      id='reason'
    >
      <div
        className='relative grid justify-center my-[10em] mx-auto'
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '0.3em',
          width: 'fit-content',
        }}
        ref={gridRef}
      >
        {/* Invisible measurement element */}
        <div
          ref={measureRef}
          className={brightClasses}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            visibility: 'hidden',
          }}
          aria-hidden='true'
        >
          A
        </div>

        {gridItems.map((item) => (
          <div
            key={item.key}
            className={item.className}
            data-line={item.lineIndex}
          >
            {item.char}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reason;
