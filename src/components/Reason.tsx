'use client';
import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import WhyCard from '../components/WhyCard';
import { whyData } from '../data/Data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Reason = () => {
  const originalMessageBright =
    'this portfolio has been built to showcase my wide variety of skills from creativity to code.';
  const originalMessageDark =
    'please take your time to discover what makes my work unique.';

  const [gridItems, setGridItems] = useState<any[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // Styles used for logic and rendering
  const brightClasses =
    'reason__reveal-bright border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[1.6rem] bg-dark relative opacity-0 transition-all duration-2000 ease-in-out -translate-x-[1000px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]';

  // Note: Added distinct class for dark items if needed, but keeping structure similar
  const darkClasses =
    'reason__reveal-dark border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[1.6rem] bg-dark text-third relative opacity-0 transition-all duration-2000 ease-in-out translate-x-[1000px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]';

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
    const columns = Math.floor((containerWidth + gap) / totalItemWidth);

    if (columns <= 0) return;

    const newItems: any[] = [];
    let currentColumn = 0;

    const processText = (
      text: string,
      type: 'bright' | 'dark',
      className: string
    ) => {
      const words = text.split(' ');

      words.forEach((word, index) => {
        const wordLength = word.length;

        // Handle space before word (if not start of text/line)
        if (index > 0) {
          if (currentColumn < columns && currentColumn > 0) {
            // Add space
            newItems.push({
              char: ' ',
              type,
              className,
              key: `space-${type}-${newItems.length}`,
            });
            currentColumn++;
          } else if (currentColumn >= columns) {
            // Space causes wrap, just reset
            currentColumn = 0;
          }
        }

        // Handle Word Flow
        if (currentColumn + wordLength > columns) {
          // Word doesn't fit, fill rest of line
          const remaining = columns - currentColumn;
          for (let i = 0; i < remaining; i++) {
            // Fillers use the same class as the text to match animation/border style
            newItems.push({
              char: '',
              type: 'filler',
              className,
              key: `filler-${newItems.length}`,
            });
          }
          currentColumn = 0;
        }

        // Add Word Characters
        for (let char of word) {
          newItems.push({
            char,
            type,
            className,
            key: `char-${type}-${newItems.length}`,
          });
        }
        currentColumn += wordLength;

        // If word ended exactly at limit, reset (or wrap if larger than line)
        if (currentColumn >= columns) {
          currentColumn = currentColumn % columns;
        }
      });
    };

    processText(originalMessageBright, 'bright', brightClasses);
    processText(originalMessageDark, 'dark', darkClasses);

    setGridItems(newItems);
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
    <section className='section flex flex-col max-w-[94em] mx-auto' id='reason'>
      <div
        className='flex flex-wrap gap-[0.3em] justify-center mt-[15em] mb-[10em] relative'
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
      {/* <WhyCard
        titleOne={whyData.reason.titleOne}
        textOne={whyData.reason.textOne}
        titleTwo={whyData.reason.titleTwo}
        textTwo={whyData.reason.textTwo}
        titleThree={whyData.reason.titleThree}
        textThree={whyData.reason.textThree}
        titleFour={whyData.reason.titleFour}
        textFour={whyData.reason.textFour}
        observation={whyData.reason.observation}
        bottom={whyData.reason.bottom}
        left={whyData.reason.left}
      /> */}
    </section>
  );
};

export default Reason;
