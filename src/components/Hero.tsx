'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import TechAssets from '../assets/images/hero-3d-assets.png';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleOneRef = useRef<HTMLHeadingElement>(null);
  const titleTwoRef = useRef<HTMLHeadingElement>(null);

  const leftRef = useRef<HTMLUListElement>(null);
  const rightRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Appearance
    tl.fromTo(
      [titleOneRef.current, titleTwoRef.current],
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
    ).fromTo(
      [leftRef.current, rightRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      '-=0.5'
    );

    // Floating Animation for the 3D Image
    gsap.to('.hero-3d-assets', {
      y: -20,
      rotation: 2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id='hero'
      className='relative w-full h-[150vh] bg-black overflow-hidden flex flex-col items-center justify-center'
    >
      {/* 3D Floating Elements (Mocked with the single generated chart for now) */}
      {/* Ideally these would be separate images, but we use the composite for effect */}
      <div className='absolute z-20 top-[15%] left-[5%] md:left-[15%] w-[150px] md:w-[300px] hero-3d-assets pointer-events-none opacity-90'>
        {/* Using visual cropping via CSS object-position for variety if needed, 
             but here just placing the main asset group floating */}
        <Image
          src={TechAssets}
          alt='Floating 3D Tech Assets'
          className='w-full h-auto drop-shadow-2xl'
        />
      </div>

      <div
        className='absolute z-20 bottom-[20%] right-[5%] md:right-[15%] w-[180px] md:w-[350px] hero-3d-assets pointer-events-none opacity-90'
        style={{ animationDelay: '1s' }}
      >
        <Image
          src={TechAssets}
          alt='Floating 3D Tech Assets'
          className='w-full h-auto drop-shadow-2xl scale-x-[-1] rotate-12'
        />
      </div>

      {/* Main Massive Typography */}
      <div className='relative z-10 flex flex-col items-center leading-none select-none mix-blend-difference'>
        <h1
          ref={titleOneRef}
          className='font-main-heavy text-[16vw] md:text-[16vw] lg:text-[16vw] tracking-tighter text-white leading-[0.8]'
        >
          FRANCIS
        </h1>
        <h1
          ref={titleTwoRef}
          className='font-main-heavy text-[16vw] md:text-[16vw] lg:text-[16vw] tracking-tighter text-white leading-[0.8]'
        >
          KODAMA
        </h1>
      </div>

      {/* Center/Floating Skills - Replaces 'Boring Weather' */}
      <div className='absolute top-[40%] left-4 md:left-12 z-30'>
        <ul
          ref={leftRef}
          className='flex flex-col gap-1 text-white/50 text-xs md:text-sm font-main-regular uppercase tracking-widest text-left'
        >
          <li className='text-white font-main-bold mb-2'>Stack_V.1</li>
          <li>React</li>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Prisma</li>
        </ul>
      </div>

      {/* Right/Floating Skills - Replaces 'Visibility' */}
      <div className='absolute bottom-[40%] right-4 md:right-12 z-30'>
        <ul
          ref={rightRef}
          className='flex flex-col gap-1 text-white/50 text-xs md:text-sm font-main-regular uppercase tracking-widest text-right'
        >
          <li className='text-white font-main-bold mb-2'>Tools_V.2</li>
          <li>CSS</li>
          <li>APIs</li>
          <li>Agile</li>
          <li>Jira</li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
