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

  // Styles used for logic and rendering
  const brightClasses =
    'reason__reveal-bright border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[0.9rem] bg-dark relative opacity-0 transition-all duration-2000 ease-in-out -translate-x-[1000px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]';

  // Note: Added distinct class for dark items if needed, but keeping structure similar
  const darkClasses =
    'reason__reveal-dark border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[0.9rem] bg-dark text-third relative opacity-0 transition-all duration-2000 ease-in-out translate-x-[1000px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]';

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
    let currentColumn = 0;

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

    const finalizeLine = (line: any[], lineWordsLength: number) => {
      if (line.length === 0) return;

      const remaining = Math.max(0, columns - lineWordsLength);
      const padLeft = Math.floor(remaining / 2);
      const padRight = Math.max(0, remaining - padLeft);

      // Add Left Fillers
      for (let i = 0; i < padLeft; i++) {
        // Use the style of the first word in the line for consistent animation logic, or default to bright
        const fillerClass = line[0]?.className || brightClasses;
        newItems.push({
          char: '',
          type: 'filler',
          className: fillerClass,
          key: `filler-l-${newItems.length}`,
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
          });
        } else {
          // It's a word, break into chars
          for (let char of item.text) {
            newItems.push({
              char,
              type: item.type,
              className: item.className,
              key: `char-${newItems.length}`,
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
        });
      }
    };

    allWords.forEach((wordObj, index) => {
      // Determine if we need a space before this word
      const needsSpace = index > 0;
      const spaceCost = needsSpace ? 1 : 0;
      const wordCost = wordObj.length;

      if (currentLineLength + spaceCost + wordCost <= columns) {
        // Fits in current line
        if (needsSpace) {
          // We store the space as a token in the line so we can render it later
          // Using the current word's type/class for the space
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
        // Doesn't fit, finalize current line
        finalizeLine(currentLine, currentLineLength);

        // Start new line with this word
        currentLine = [wordObj];
        currentLineLength = wordCost;
      }
    });

    // Finalize the last line
    finalizeLine(currentLine, currentLineLength);

    setGridItems(newItems);
    setColumns(columns);
  }, []);

  useLayoutEffect(() => {
    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [calculateLayout]);

  const reasonReveal = useCallback(() => {
    const revealsBright = document.querySelectorAll('.reason__reveal-bright');
    const revealsDark = document.querySelectorAll('.reason__reveal-dark');
    const elementVisible = 250;
    let windowHeight = window.innerHeight;

    const activeClasses = ['!translate-x-0', '!opacity-100'];

    const revealFn = (elements: NodeListOf<Element>) => {
      elements.forEach((el) => {
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add(...activeClasses);
        } else {
          el.classList.remove(...activeClasses);
        }
      });
    };

    revealFn(revealsBright);
    revealFn(revealsDark);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', reasonReveal);
    // Trigger once on mount/update to catch initial state
    reasonReveal();

    return () => {
      window.removeEventListener('scroll', reasonReveal);
    };
  }, [gridItems, reasonReveal]); // Re-bind when gridItems change (DOM changes)

  return (
    <section className='section flex flex-col max-w-[85em] mx-auto' id='reason'>
      <div
        className='grid justify-center mt-[15em] mb-[10em] relative'
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '0.3em',
          width: 'fit-content',
          margin: '15em auto 10em auto',
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
          <div key={item.key} className={item.className}>
            {item.char}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reason;
