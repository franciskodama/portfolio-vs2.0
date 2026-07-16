'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-scroll';
import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger);

import SquareBracketsImg from '../assets/images/hero/hero_3d_square_brackets.png';
import CodeBracketsImg from '../assets/images/hero/hero_3d_code_brackets.png';
import CurlyBracesBiggerImg from '../assets/images/hero/hero_3d_curly_braces2.webp';
import CurlyBracesImg from '../assets/images/hero/hero_3d_curly_braces.png';
import Scroll from '../assets/images/ico-scroll.svg';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleOneRef = useRef<HTMLHeadingElement>(null);
  const titleTwoRef = useRef<HTMLHeadingElement>(null);

  const leftRef = useRef<HTMLUListElement>(null);
  const rightRef = useRef<HTMLUListElement>(null);

  const [index, setIndex] = useState(0);
  const extraInfos = [
    <span
      key='geo'
      className='flex flex-wrap justify-center items-center gap-2 px-4'
    >
      <span>Brazilian</span>
      <span className='text-lg md-custom:text-xl'>🇧🇷</span>
      <span>based in Ottawa, Canada</span>
      <span className='text-lg md-custom:text-xl'>🇨🇦</span>
    </span>,
    <span key='exp' className='px-4'>
      20+ Years Executive Leadership
    </span>,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % extraInfos.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [extraInfos.length]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Appearance
    tl.fromTo(
      [titleOneRef.current, titleTwoRef.current],
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
    )
      .fromTo(
        [leftRef.current, rightRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        '.floating-asset',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        },
        '-=1'
      );

    gsap.to('.floating-asset', {
      y: -35,
      rotation: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.5,
        from: 'random',
      },
    });

    if (leftRef.current && rightRef.current) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '50% top',
            scrub: 1,
          },
        })
        .to(leftRef.current, { x: -300, opacity: 0 })
        .to(rightRef.current, { x: 300, opacity: 0 }, '<')
        .to(
          '.hero-letter',
          {
            x: () => (Math.random() - 0.5) * 1500,
            y: () => (Math.random() - 0.5) * 1500,
            rotation: () => (Math.random() - 0.5) * 360,
            opacity: 0,
            scale: 0.5,
          },
          '<'
        );
    }
  }, []);

  const pushAsset = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const img = element.querySelector('img');
    if (!img) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = centerX - e.clientX;
    const deltaY = centerY - e.clientY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = 50;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    gsap.to(img, {
      x: moveX,
      y: moveY,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(img, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)',
        });
      },
    });
  };

  const renderLetters = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className='hero-letter inline-block'>
        {char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id='hero'
      className='relative w-full h-screen bg-linear-to-b from-black to-dark overflow-hidden'
    >
      <div className='container mx-auto relative w-full h-full flex flex-col items-center justify-center'>
        <div
          className='absolute z-10 top-[27%] left-9 md-custom:top-[26%] lg-custom:left-48 w-[60px] md-custom:w-[100px] lg-custom:w-[120px] floating-asset cursor-pointer'
          onMouseEnter={pushAsset}
        >
          <Image
            src={SquareBracketsImg}
            alt='3D Square Brackets'
            className='w-full h-auto drop-shadow-2xl opacity-90 -rotate-12'
          />
        </div>

        <div
          className='absolute z-10 top-[28%] right-4 md-custom:top-[24%] lg-custom:right-38 w-[70px] md-custom:w-[120px] lg-custom:w-[180px] floating-asset cursor-pointer'
          onMouseEnter={pushAsset}
        >
          <Image
            src={CurlyBracesBiggerImg}
            alt='3D Curly Braces'
            unoptimized
            className='w-full h-auto drop-shadow-2xl opacity-90 rotate-6'
          />
        </div>

        <div
          className='absolute z-50 bottom-[20%] left-8 md-custom:bottom-[30%] lg-custom:left-40 w-[60px] md-custom:w-[80px] lg-custom:w-[130px] floating-asset cursor-pointer'
          onMouseEnter={pushAsset}
        >
          <Image
            src={CurlyBracesImg}
            alt='3D Curly Braces'
            className='w-full h-auto drop-shadow-2xl opacity-90 -rotate-6'
          />
        </div>

        <div
          className='absolute z-50 bottom-[35%] right-4 md-custom:bottom-[33%] lg-custom:right-28 w-[70px] md-custom:w-[100px] lg-custom:w-[160px] floating-asset cursor-pointer'
          onMouseEnter={pushAsset}
        >
          <Image
            src={CodeBracketsImg}
            alt='3D Code Brackets'
            className='w-full h-auto drop-shadow-2xl opacity-90 rotate-12'
          />
        </div>

        <h2 className='font-main-light text-bright/80 text-sm md-custom:text-xl uppercase tracking-[0.2em] mb-4'>
          Hello, I am
        </h2>

        <div className='relative z-40 flex flex-col items-center leading-none select-none my-4 md-custom:my-0'>
          <h1
            ref={titleOneRef}
            className='font-main-heavy text-white text-[18vw] md-custom:text-[12vw] lg-custom:text-[14vw] xl:text-[12rem] tracking-tighter leading-[0.8]'
          >
            {renderLetters('FRANCIS')}
          </h1>
          <h1
            ref={titleTwoRef}
            className='font-main-heavy text-[18vw] md-custom:text-[12vw] lg-custom:text-[14vw] xl:text-[12rem] tracking-tighter text-white leading-[0.8]'
          >
            {renderLetters('KODAMA')}
          </h1>
        </div>

        <h2 className='m-2 font-main-light text-bright/80 text-sm md-custom:text-xl uppercase tracking-[0.2em]'>
          TECHNICAL PRODUCT LEAD
        </h2>

        <div className='relative h-10 w-full flex items-center justify-center overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.h3
              key={index}
              initial={{ y: 20, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -20, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className='absolute font-main-light text-bright/80 text-[10px] md-custom:text-sm uppercase tracking-[0.2em] text-center whitespace-nowrap'
            >
              {extraInfos[index]}
            </motion.h3>
          </AnimatePresence>
        </div>

        <div className='absolute top-[50%] -translate-y-1/2 left-4 md-custom:left-4 z-30 hidden lg-custom:block'>
          <ul
            ref={leftRef}
            className='flex flex-col gap-1 text-white/50 text-xs md-custom:text-sm font-main-regular uppercase tracking-widest text-left'
          >
            <li className='text-white font-main-bold mb-2'>Skills</li>
            <li>Product Strategy</li>
            <li>Arch & Design</li>
            <li>Exec Leadership</li>
            <li>AI-Driven Dev</li>
            <li>Org Alignment</li>
          </ul>
        </div>

        <div className='absolute top-[50%] -translate-y-1/2 right-4 md-custom:right-4 z-30 hidden lg-custom:block'>
          <ul
            ref={rightRef}
            className='flex flex-col gap-1 text-white/50 text-xs md-custom:text-sm font-main-regular uppercase tracking-widest text-right'
          >
            <li className='text-white font-main-bold mb-2'>Stack</li>
            <li>React / Next.js</li>
            <li>Typescript</li>
            <li>AI Workflows</li>
            <li>API Integrations</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
        <Link
          to='reason'
          spy={true}
          smooth={true}
          offset={-150}
          duration={2000}
        >
          <Image
            src={Scroll}
            className='absolute bottom-[6%] left-[49%] -translate-x-1/2 w-10 h-10 border-0 cursor-pointer z-3'
            alt='icon to scroll'
          />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
