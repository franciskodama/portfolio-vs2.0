'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Link } from 'react-scroll';
const Video = '/assets/hero-bg.mp4';
import Scroll from '../assets/images/ico-scroll.svg';

const Hero = () => {
  const sidesWrapperRef = useRef<HTMLDivElement>(null);
  const sideLeftRef = useRef<HTMLDivElement>(null);
  const sideTopRef = useRef<HTMLDivElement>(null);
  const sideRightRef = useRef<HTMLDivElement>(null);

  const onMoveHandler = (e: React.MouseEvent) => {
    let X = e.pageX;
    let Y = e.pageY;

    if (sideLeftRef.current && sideTopRef.current && sideRightRef.current) {
      sideLeftRef.current.style.transform =
        'skew(0deg, 30deg) scaleY(1.33333) translate(' +
        (X / 100) * -3 +
        'px, ' +
        (Y / 100) * -3 +
        'px)';
      sideTopRef.current.style.transform =
        'skew(60deg, -30deg) scaleY(.66667) translate(' +
        (X / 100) * 3 +
        'px, ' +
        (Y / 100) * -3 +
        'px)';
      sideRightRef.current.style.transform =
        'skew(0deg, -30deg) scaleY(1.33333) translate(' +
        (X / 100) * -3 +
        'px, ' +
        (Y / 100) * -3 +
        'px)';
    }
  };

  return (
    <section className='section relative w-full h-screen pt-[7.5em] bg-dark overflow-hidden' id='hero'>
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-screen left-1/2 top-0 object-cover -translate-x-1/2 z-[1]"
      >
        <source src={Video} type='video/mp4' />
      </video>
      <div className='absolute top-0 left-0 w-full h-screen bg-dark opacity-50 z-[2]'></div>
      <div className='container flex justify-center items-center relative h-full w-[90%] mx-auto z-[3]' ref={sidesWrapperRef}>
        <div className='relative font-main-heavy text-[1.7rem] leading-[1.5rem] w-[15em] h-[13em] z-10 md-custom:text-[3.5rem] md-custom:leading-[3rem] xl-custom:w-[14.5em] xl-custom:h-[13em]' onMouseMove={onMoveHandler}>
          <div className='flex flex-col absolute skew-y-[30deg] scale-y-[1.33333] top-[47%] left-[8.2%] text-bright opacity-0 animate-cube-left xl-custom:top-[42%] xl-custom:left-[13%]' ref={sideLeftRef}>
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">hey, I'm</h2>
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">Francis</h2> 
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">Kodama</h2> 
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">Based in</h2> 
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">Ottawa, </h2>
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">Canada.</h2>
          </div>
          <div className='flex flex-col absolute [transform:skew(60deg,-30deg)_scaleY(0.66667)] top-[2%] left-[30%] text-bright opacity-0 animate-cube-top xl-custom:left-[30.5%]' ref={sideTopRef}>
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">Software</h2> 
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">engineer </h2> 
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">-----------</h2>
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">react sass</h2> 
            <h2 className="transition-all duration-100 hover:text-third hover:scale-110">next.js, js</h2>
          </div>
          <div className='flex flex-col absolute skew-y-[-30deg] scale-y-[1.33333] top-[39%] left-[48%] text-third opacity-0 animate-cube-right md-custom:top-[37%] md-custom:left-[47%] xl-custom:top-[38%] xl-custom:left-[47%]' ref={sideRightRef}>
            <h2 className="transition-all duration-100 hover:text-bright hover:scale-110">typescript</h2>
            <h2 className="transition-all duration-100 hover:text-bright hover:scale-110">apis design</h2>
            <h2 className="transition-all duration-100 hover:text-bright hover:scale-110">agile + jira</h2>
            <h2 className="transition-all duration-100 hover:text-bright hover:scale-110">git figma xd</h2>
            <h2 className="transition-all duration-100 hover:text-bright hover:scale-110">PHOTOSHOP</h2>
            <h2 className="transition-all duration-100 hover:text-bright hover:scale-110">responsive</h2>
          </div>
        </div>
      </div>
      <Link to='reason' spy={true} smooth={true} offset={-150} duration={2000}>
        <Image src={Scroll} className='absolute bottom-[3%] left-[49%] -translate-x-1/2 w-10 h-10 border-0 cursor-pointer z-[3]' alt='icon to scroll' />
      </Link>
    </section>
  );
};

export default Hero;
