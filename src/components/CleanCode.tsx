'use client';

import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import ZoomIn from '../assets/images/code-check.svg';

const CleanCode = () => {
  return (
    <section
      id='code'
      className='section relative flex flex-col transition-all duration-300 bg-dark bg-linear-to-b from-dark to-[#292929]'
    >
      <Parallax opacity={[0, 2]}>
        <h1 className='section-title text-center'>My code</h1>
        <p className='mt-[0.4em] text-center text-third font-main-regular'>
          It must be read like a story
        </p>
      </Parallax>

      <div className='container relative flex flex-col items-center w-full min-h-[70em] mt-36 mb-20 md-custom:min-h-[110em] mx-auto'>
        <Parallax opacity={[0, 2]} translateY={['0%', '-10%']}>
          <div className='flex flex-col'>
            <q className='font-main-regular text-[1.6rem] leading-8 w-[20ch] mb-[2em] text-center md-custom:text-[2rem] md-custom:leading-[2.3rem]'>
              Clean code always looks like it was written by someone who cares.
            </q>
            <p className='font-main-light text-[1.3rem] mb-[0.1em] text-center md-custom:text-[1.5rem] md-custom:leading-8'>
              <span className='text-third'>― </span>Robert C. Martin
            </p>
            <p className='font-main-light text-[1rem] mb-48 text-center md-custom:mb-80'>
              Author of Clean Code
            </p>
          </div>
        </Parallax>

        <a
          href='https://github.com/franciskodama?tab=repositories'
          target='_blank'
          rel='noopener noreferrer'
          className='hidden md-custom:block absolute top-[18%] left-1/2 -translate-x-1/2 text-center font-main-regular text-[0.7rem] leading-4 cursor-pointer z-10'
        >
          <div className='flex items-center gap-2'>
            <Image src={ZoomIn} alt='icon zoom in' />
            <p className='w-[8ch]'>CHECK MY CODE</p>
          </div>
        </a>

        <Parallax opacity={[0, 2]}>
          <ul className='font-main-heavy uppercase text-center min-h-[50em] animate-words-appearance md-custom:w-[28em] md-custom:text-[2em] md-custom:leading-10 mx-auto'>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[2.5rem] leading-10 md-custom:text-[7.5rem] md-custom:leading-28'>
              DRY
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[0.65rem] leading-4 md-custom:text-[1.5rem] md-custom:leading-[2.4rem]'>
              meticulousness
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.6rem] leading-[1.8rem] text-left pl-6 md-custom:text-[4.5rem] md-custom:leading-21 md-custom:pl-32'>
              easy to read
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.2rem] leading-[1.45rem] text-left pl-[2em] md-custom:text-[3.75rem] md-custom:leading-16 md-custom:pl-[2.4em]'>
              easy to change
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.1rem] leading-[1.3rem] text-left pl-[4em] md-custom:text-[3rem] md-custom:leading-15 md-custom:pl-[3.5em]'>
              naming
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[0.65rem] leading-[0.9rem] text-left pl-[10em] md-custom:text-[1.65rem] md-custom:leading-9 md-custom:pl-[7.9em]'>
              conventions
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1rem] leading-[1.2rem] text-left pl-[5em] md-custom:text-[3rem] md-custom:leading-15 md-custom:pl-[4.6em]'>
              don't repeat
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.3rem] leading-6 text-left pl-[4em] md-custom:text-[3.9rem] md-custom:leading-[4.2rem] md-custom:pl-[3.6em]'>
              your self
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.35rem] leading-[1.6rem] md-custom:text-[4.2rem] md-custom:leading-20 md-custom:pr-[1.1em]'>
              keep it
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.35rem] leading-[1.6rem] pl-[1em] md-custom:text-[4.2rem] md-custom:leading-20 md-custom:pl-[0.7em]'>
              simple
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.1rem] leading-6 pl-4 md-custom:text-[2.4rem] md-custom:leading-[2.4rem] md-custom:pr-[6.5em]'>
              clear and concise
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.4rem] leading-[1.8rem] text-left pl-10 md-custom:text-[3.5rem] md-custom:leading-18 md-custom:pl-[4.2em]'>
              consistency
            </li>
            <li className='transform-[skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.6rem] leading-[1.8rem] text-right pr-6 md-custom:text-[3rem] md-custom:leading-[3.6rem] md-custom:pr-[4.4em] lg-custom:text-[4.5rem] lg-custom:leading-[4.8rem] lg-custom:pl-[3.7em]'>
              uncomplicate
            </li>
            <li className='transform-[skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[2rem] leading-10 text-left pl-[1.5em] md-custom:text-[7.5rem] md-custom:leading-[8.9rem] md-custom:pl-[2.85em]'>
              BEM
            </li>
          </ul>
        </Parallax>
      </div>
    </section>
  );
};

export default CleanCode;
