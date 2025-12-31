'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import WhyCard from '../components/WhyCard';
import { whyData } from '../data/Data';
import ZoomIn from '../assets/images/code-check.svg';
import ZoomOut from '../assets/images/code-check-return.svg';

const CleanCode = () => {
  const [showBackground, setShowBackground] = useState(false);

  const handleClick = () => {
    setShowBackground(!showBackground);
  };

  return (
    <section
      id='code'
      className={`section relative flex flex-col transition-all duration-300 ${
        showBackground 
          ? 'bg-[url("../assets/images/xray.jpg")] bg-no-repeat bg-center animate-code-appearance h-[135em]' 
          : 'bg-dark bg-linear-to-b from-dark to-[#292929]'
      }`}
      style={{ padding: showBackground ? '35em' : '0' }}
    >
      <Parallax opacity={[0, 2]}>
        <h1
          className='section-title text-center'
          style={{ display: showBackground ? 'none' : 'block' }}
        >
          My code
        </h1>
        <p
          className='mt-[0.8em] text-center'
          style={{ display: showBackground ? 'none' : 'block' }}
        >
          It must be read like a story
        </p>
      </Parallax>

      <div className='container relative flex flex-col items-center w-full min-h-[70em] mt-32 mb-20 md-custom:min-h-[110em] mx-auto'>
        <Parallax opacity={[0, 2]} translateY={['0%', '-10%']}>
          <div
            className='flex flex-col'
            style={{ display: showBackground ? 'none' : 'flex' }}
          >
            <q className='font-main-regular text-[1.6rem] leading-[2rem] w-[20ch] mb-[0.8em] text-center md-custom:text-[2rem] md-custom:leading-[2.3rem]'>
              “Clean code always looks like it was written by someone who
              cares.”
            </q>
            <p className='font-main-light text-[1.3rem] mb-[0.1em] text-center md-custom:text-[1.5rem] md-custom:leading-[2rem]'>
              <span className='text-third'>― </span>Robert C.
              Martin
            </p>
            <p className='font-main-thin text-[1rem] mb-48 text-center md-custom:mb-80'>Author of Clean Code</p>
          </div>
        </Parallax>

        <div className='hidden md-custom:block absolute top-[15%] left-1/2 -translate-x-1/2 text-center font-main-regular text-[0.7rem] leading-4 cursor-pointer z-10' onClick={handleClick}>
          <Image
            src={!showBackground ? ZoomIn : ZoomOut}
            alt='icon zoom in or out'
          />
          <p
            className='w-[8ch]'
            style={{
              display: !showBackground ? 'block' : 'none',
            }}
          >
            CHECK MY CODE
          </p>
          <p
            style={{
              display: showBackground ? 'block' : 'none',
            }}
          >
            RETURN
          </p>
        </div>

        <Parallax opacity={[0, 2]}>
          <ul
            className='font-main-heavy uppercase text-center h-[30em] animate-words-appearance mr-40 md-custom:mr-0 md-custom:w-[28em] md-custom:text-[2em] md-custom:leading-10'
            style={{ display: showBackground ? 'none' : 'block' }}
          >
            <li className='[transform:skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[3.75rem] leading-[3.5rem] md-custom:text-[7.5rem] md-custom:leading-[7rem]'>DRY</li>
            <li className='[transform:skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[0.75rem] leading-[1.5rem] md-custom:text-[1.5rem] md-custom:leading-[2.4rem]'>
              meticulousness
            </li>
            <li className='[transform:skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[2.25rem] leading-[2.62rem] text-left pl-20 md-custom:text-[4.5rem] md-custom:leading-[5.25rem] md-custom:pl-32'>easy to read</li>
            <li className='[transform:skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.875rem] leading-[2.1rem] text-left pl-[6.1em] md-custom:text-[3.75rem] md-custom:leading-[4rem] md-custom:pl-[2.4em]'>easy to change</li>
            <li className='[transform:skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[1.5rem] leading-[1.8rem] text-left pl-[8.3em] md-custom:text-[3rem] md-custom:leading-[3.75rem] md-custom:pl-[3.5em]'>naming</li>
            <li className='[transform:skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[0.82rem] leading-[1.3rem] text-left pl-[16.5em] md-custom:text-[1.65rem] md-custom:leading-[2.25rem] md-custom:pl-[7.9em]'>conventions</li>
            <li className='[transform:skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.5em] leading-[1.87rem] text-left pl-[9.3em] md-custom:text-[3rem] md-custom:leading-[3.75rem] md-custom:pl-[4.6em]'>don't repeat</li>
            <li className='[transform:skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.95rem] leading-[2.25rem] text-left pl-[7.2em] md-custom:text-[3.9rem] md-custom:leading-[4.2rem] md-custom:pl-[3.6em]'>your self</li>
            <li className='[transform:skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[2.1rem] leading-[2.62rem] pl-[0.7em] md-custom:text-[4.2rem] md-custom:leading-[5rem] md-custom:pr-[1.1em]'>keep it</li>
            <li className='[transform:skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[2.1rem] leading-[2.62rem] pl-[2.6em] md-custom:text-[4.2rem] md-custom:leading-[5rem] md-custom:pl-[0.7em]'>simple</li>
            <li className='[transform:skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[1.72rem] leading-[2.25rem] pl-20 md-custom:text-[2.4rem] md-custom:leading-[2.4rem] md-custom:pr-[6.5em]'>clear and concise</li>
            <li className='[transform:skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[2.25rem] leading-[2.85rem] text-left pl-24 md-custom:text-[3.5rem] md-custom:leading-[4.5rem] md-custom:pl-[4.2em]'>consistency</li>
            <li className='[transform:skew(0deg,-30deg)_scaleY(1.33333)] text-third text-[2.25rem] leading-[2.85rem] text-right pl-4 md-custom:text-[3rem] md-custom:leading-[3.6rem] md-custom:pr-[4.4em] lg-custom:text-[4.5rem] lg-custom:leading-[4.8rem] lg-custom:pl-[3.7em]'>uncomplicate</li>
            <li className='[transform:skew(60deg,-30deg)_scaleY(0.66667)] text-bright text-[3.75rem] leading-[4.125rem] text-left pl-[3.8em] md-custom:text-[7.5rem] md-custom:leading-[8.9rem] md-custom:pl-[2.85em]'>BEM</li>
          </ul>
        </Parallax>

        {!showBackground ? (
          <WhyCard
            titleOne={whyData.code.titleOne}
            textOne={whyData.code.textOne}
            titleTwo={whyData.code.titleTwo}
            textTwo={whyData.code.textTwo}
            titleThree={whyData.code.titleThree}
            textThree={whyData.code.textThree}
            titleFour={whyData.code.titleFour}
            textFour={whyData.code.textFour}
            observation={whyData.code.observation}
            bottom={whyData.code.bottom}
            left={whyData.code.left}
          />
        ) : null}
      </div>
    </section>
  );
};

export default CleanCode;
