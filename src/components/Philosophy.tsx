'use client';

import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import ZoomIn from '../assets/images/code-check.svg';

const Philosophy = () => {
  return (
    <section
      id='philosophy'
      className='section relative flex flex-col transition-all duration-300 bg-dark bg-linear-to-b from-dark to-[#292929]'
    >
      <Parallax opacity={[0, 2]}>
        <h1 className='section-title text-center'>PRODUCT PHILOSOPHY</h1>
        <p className='mt-[0.4em] text-center text-third font-main-regular'>
          Code is only as good as the value it creates.
        </p>
      </Parallax>

      <div className='container relative flex flex-col items-center w-full min-h-[56em] text-center mt-24 md-custom:min-h-[95em] mx-auto'>
        <Parallax opacity={[0, 2]} translateY={['0%', '-10%']}>
          <div className='flex flex-col'>
            <q className='w-full px-8 font-main-regular text-[1.6rem] leading-8 md-custom:w-[32ch] mb-[1em] md-custom:text-[2rem] md-custom:leading-[2.8rem]'>
              It doesn't matter how good your engineering team is if they are
              not given something worthwhile to build.
              {/* If you think professional architecture is expensive, try hiring an
              amateur. */}
            </q>
            <p className='font-main-light text-[1.3rem] mb-[0.1em] md-custom:text-[1.5rem] md-custom:leading-8'>
              <span className='text-third'>― </span>Marty Cagan
              {/* Brian Foote & Joseph Yoder */}
            </p>
          </div>
        </Parallax>

        <a
          href='https://github.com/franciskodama'
          target='_blank'
          rel='noopener noreferrer'
          className='hidden md-custom:block text-center font-main-regular text-[0.7rem] mt-18 leading-4 cursor-pointer z-10'
        >
          <div className='flex items-center gap-2'>
            <Image src={ZoomIn} alt='icon zoom in' />
            <p className='w-[8ch] uppercase'>Check my Projects</p>
          </div>
        </a>

        <Parallax opacity={[0, 2]}>
          <ul className='lg-custom:scale-65 -mb-20 mt-24 md-custom:-mt-28 font-main-heavy uppercase text-center animate-words-appearance md-custom:w-[28em] md-custom:text-[2em] md-custom:leading-10 mx-auto'>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] md-custom:pr-60 text-third text-[2rem] leading-10 md-custom:text-[6.4rem] md-custom:leading-34'>
              Authentic
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] md-custom:pr-32 text-third text-[2rem] leading-10 md-custom:text-[6rem] md-custom:leading-21'>
              Leadership
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] md-custom:pr-66 text-bright text-[2.5rem] leading-10 md-custom:text-[7.5rem] md-custom:leading-42'>
              PRODUCT
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] md-custom:pr-16 text-bright text-[2.2rem] leading-10 md-custom:text-[7rem] md-custom:leading-24'>
              DISCOVERY
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.6rem] leading-[1.8rem] text-center md-custom:text-left md-custom:pl-32 md-custom:text-[4.5rem] md-custom:leading-28'>
              OUTCOMES
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.6rem] leading-[1.45rem] text-center md-custom:text-left md-custom:pl-32 md-custom:text-[4.5rem] md-custom:leading-14'>
              OVER OUTPUTS
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.1rem] leading-[1.3rem] text-center md-custom:text-left md-custom:pl-[2em] md-custom:text-[3.4rem] md-custom:leading-24'>
              TECHNICAL FEASIBILITY
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1rem] leading-[1.2rem] text-center md-custom:text-left md-custom:pl-[4em] md-custom:text-[3.5rem] md-custom:leading-11'>
              MINIMAL VIABLE
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.3rem] leading-6 text-center md-custom:text-left md-custom:pl-[3.6em] md-custom:text-[3.9rem] md-custom:leading-22'>
              ARCHITECTURE
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.35rem] leading-[1.6rem] text-center md-custom:text-right md-custom:pr-[4em] md-custom:text-[6rem] md-custom:leading-28'>
              USER
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.35rem] leading-[1.6rem] text-center md-custom:text-left md-custom:pl-[2em] md-custom:text-[6rem] md-custom:leading-28'>
              EXPERIENCE
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.1rem] leading-6 text-center md-custom:pr-[1.5em] md-custom:text-[4rem] md-custom:leading-19'>
              SCALABLE
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-third text-[1.4rem] leading-[1.8rem] text-center md-custom:text-left md-custom:pl-[4.2em] md-custom:text-[4rem] md-custom:leading-20'>
              INTEGRITY
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-bright text-[1.6rem] leading-[1.8rem] text-center md-custom:text-right md-custom:pl-[2.4em] md-custom:text-[6.5rem] md-custom:leading-30'>
              EMPOWERED
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[2rem] leading-10 text-center md-custom:text-left md-custom:pl-[2.9em] md-custom:text-[6.5rem] md-custom:leading-30'>
              EXECUTION
            </li>
          </ul>
        </Parallax>
      </div>
    </section>
  );
};

export default Philosophy;
