'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import WhyPic01 from '../assets/images/why-pic-01.jpg';
import WhyPic02 from '../assets/images/why-pic-02.jpg';
import WhyPic03 from '../assets/images/why-pic-03.jpg';
import WhyPic04 from '../assets/images/why-pic-04.jpg';
import WhyPic05 from '../assets/images/why-pic-05.jpg';
import WhyPic06 from '../assets/images/why-pic-06.jpg';
import WhyPic07 from '../assets/images/why-pic-07.jpg';
import WhyPic08 from '../assets/images/why-pic-08.jpg';
import WhyPic09 from '../assets/images/why-pic-09.jpg';
import WhyPic10 from '../assets/images/why-pic-10.jpg';
import WhyPic11 from '../assets/images/why-pic-11.jpg';
import WhyPic12 from '../assets/images/why-pic-12.jpg';
import WhyPic13 from '../assets/images/why-pic-13.jpg';
import WhyPic14 from '../assets/images/why-pic-14.jpg';
import WhyPic15 from '../assets/images/why-pic-15.jpg';
import WhyPic16 from '../assets/images/why-pic-16.jpg';

const WhyMe = () => {
  const [heartShown, setHeartShown] = useState(false);

  const [oneShown, setOneShown] = useState(false);
  const [twoShown, setTwoShown] = useState(false);
  const [threeShown, setThreeShown] = useState(false);
  const [fourShown, setFourShown] = useState(false);
  const [fiveShown, setFiveShown] = useState(false);
  const [sixShown, setSixShown] = useState(false);
  const [sevenShown, setSevenShown] = useState(false);
  const [eightShown, setEightShown] = useState(false);
  const [nineShown, setNineShown] = useState(false);
  const [tenShown, setTenShown] = useState(false);
  const [elevenShown, setElevenShown] = useState(false);
  const [twelveShown, setTwelveShown] = useState(false);
  const [thirteenShown, setThirteenShown] = useState(false);
  const [fourteenShown, setFourteenShown] = useState(false);
  const [fifteenShown, setFifteenShown] = useState(false);
  const [sixteenShown, setSixteenShown] = useState(false);

  return (
    <section className='section bg-dark' id='whyme'>
      <div className='container mt-20 mb-24 max-w-[80%] mx-auto lg-custom:max-w-full'>
        <h1 className='section-title mt-20'>Why Me?</h1>
        <p className='mt-[0.8em] mb-20 text-center'>
          The opportunity to have a fully<br></br>qualified professional in your
          team.
        </p>

        <div
          className={`relative flex-col rounded-full w-[19em] h-[19em] items-center mx-auto animate-circle-appear bg-third p-8 lg-custom:w-[22em] lg-custom:h-[22em] lg-custom:p-[3.3em_3.5em_4em_3.5em] ${heartShown ? 'hidden' : 'flex'}`}
        >
          <h4 className='w-[8ch] text-dark mb-[0.8em] leading-[1.3rem] text-[1.5rem] text-center uppercase font-main-heavy'>Whole package</h4>
          <p className='text-[1.5rem] text-center uppercase font-main-semibold leading-[1.7rem]'>
            Maturity, organization, strategic view, and much more from 24 years
            of experience.
          </p>
        </div>

        <div
          className={`relative flex-col rounded-full w-[19em] h-[19em] items-center mx-auto animate-circle-appear bg-dark border-2 border-third p-[1.8em_3em] lg-custom:w-[22em] lg-custom:h-[22em] lg-custom:p-[1.8em_2.5em] ${heartShown ? 'flex' : 'hidden'}`}
        >
          <h4 className='text-center uppercase font-main-heavy text-[1.3rem] mb-[0.3em] text-dark [text-shadow:-1px_1px_var(--color-bright),1px_1px_var(--color-bright),-1px_-1px_var(--color-bright),1px_-1px_var(--color-bright)]'>PASSION</h4>
          <div className='text-center uppercase font-main-regular text-third text-[0.9rem] leading-[1.1rem]'>
            My career in marketing <br></br> spanned more than two decades, and
            I achieved important positions <br></br>I had planned. Now is the
            time for me to pursue a career I've been passionate about since I
            was a teenager. A career that I've been working on and having a lot
            of fun with!
            <br></br>
            <br></br>
            <q className='hidden font-main-light italic text-bright lg-custom:block' rel='Joe Namath'>
              "When you have fun, you can do amazing things."
            </q>
            <span className='hidden text-bright mt-2 lg-custom:block'>- Joe Namath</span>
          </div>
        </div>

        <div
          className='absolute left-1/2 -translate-x-1/2 -translate-y-[35px] flex flex-col bg-third rounded-full w-[4.5em] h-[4.5em] items-center p-[0.8em] mx-auto border-2 border-dark cursor-pointer z-[3]'
          onClick={() => setHeartShown(!heartShown)}
        >
          <h4 className='w-[8ch] font-main-semibold text-dark mb-2 text-[0.5rem] leading-[0.5rem] text-center uppercase'>Why changing carrers?</h4>
          <p className='font-main-regular text-[0.5rem] leading-[0.5rem] text-center uppercase w-[5ch]'>Click here</p>
        </div>

        <section className='flex flex-col items-center relative lg-custom:after:content-[""] lg-custom:after:absolute lg-custom:after:top-0 lg-custom:after:left-1/2 lg-custom:after:-translate-x-1/2 lg-custom:after:h-[85%] lg-custom:after:w-[3px] lg-custom:after:bg-third'>
          <Parallax
            opacity={[0, 2]}
            translateY={['100%', '-50%']}
            scale={[2, 0.8]}
          >
            <div className='flex flex-col items-center justify-center mt-12 lg-custom:flex-row lg-custom:mt-20'>
              <div className='flex flex-col items-center relative m-0 w-[85%] lg-custom:w-[25em] lg-custom:block lg-custom:mr-10'>
                <div className='flex flex-wrap items-center justify-center lg-custom:flex-nowrap lg-custom:justify-end'>
                  <h3 className='text-third text-[1.5rem] uppercase font-main-heavy leading-[1.5rem] p-0 lg-custom:w-[8ch]'>Changing carreers</h3>
                  <span
                    className='text-[2.8em] font-main-regular text-third pb-1 mx-[0.3em]'
                  >
                    {String.fromCharCode(123)}
                  </span>
                  <div className='text-[1.5rem] uppercase font-main-heavy leading-[1.5rem] w-[10ch]'>
                    software engineer
                  </div>
                  <span className='text-[2.8em] font-main-regular text-third pb-1'>
                    {String.fromCharCode(125)}
                  </span>
                  <div className='hidden absolute right-[-2.95em] top-8 bg-third w-3 h-3 lg-custom:block'></div>
                </div>
                <p className='text-third font-main-regular text-center text-[0.8rem]'>
                  2020 ~ <span className='font-main-semibold bg-third text-dark px-[0.6em]'>TODAY</span>
                </p>
                <p className='text-right text-[0.8rem] font-main-regular leading-4 mt-1 uppercase text-center lg-custom:text-right'
                style={{ width: "95%"}}
                >
                  React | Next.js | JavaScript | Typescript | CSS3 | SASS | HTML5 | 
                  Styled Components | Tailwind | APIs | Prisma | GraphQL | Retool | 
                  Airtable | Firebase | Responsive Design | Git | Yarn | NPM | 
                  Figma | Adobe Photoshop | Jira | Agile | ...And a big  smile
                </p>
              </div>
              <div className='flex flex-col items-center text-center mt-4 ml-0 w-[85%] lg-custom:w-[25em] lg-custom:items-start lg-custom:text-left lg-custom:m-0 lg-custom:ml-10'>
                <h6 className='font-main-semibold text-[0.8rem] text-third uppercase'>
                  How does all of this benefit you?
                </h6>
                <h5 className='font-main-semibold text-[1.2rem] leading-[1.5rem] mt-2 uppercase lg-custom:w-[25ch]'>
                  I will work with teams, contributing and inspiring colleagues
                  in order to get the best out of us.
                </h5>
              </div>
            </div>
          </Parallax>

          <Parallax
            opacity={[0, 2]}
            translateY={['100%', '-50%']}
            scale={[2, 0.8]}
          >
            <div className='flex flex-col items-center justify-center lg-custom:flex-row'>
              <div className='relative flex flex-col items-end text-right mr-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:mr-10'>
                <h3 className='text-[1.5rem] leading-[1.5rem] text-dark uppercase font-main-heavy [text-shadow:-1px_1px_var(--color-bright),1px_1px_var(--color-bright),-1px_-1px_var(--color-bright),1px_-1px_var(--color-bright)] w-[15ch] mb-[0.4em] leading-[1.1em]'>General Director</h3>
                <div className='hidden absolute right-[-2.95em] top-8 bg-third w-3 h-3 lg-custom:block'></div>
                <p className='text-[0.8rem] font-main-light uppercase w-[25ch]'>
                  Circus | <span className='text-third font-main-regular'>2016 ~ 2020</span>
                </p>
                <ul className='text-[0.8rem] font-main-regular leading-4 text-right mt-1 uppercase'>
                  <li>Leadership</li>
                  <li>Product Strategy</li>
                  <li>Agile methodology</li>
                </ul>
              </div>

              <div className='flex flex-col items-start text-left mt-4 ml-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:ml-10'>
                <h6 className='font-main-semibold text-[0.8rem] text-third uppercase'>Why is it good for you?</h6>
                <h5 className='font-main-semibold text-[1.2rem] leading-[1.5rem] mt-2 uppercase lg-custom:w-[25ch]'>
                  I will bring valuable experience and leadership skills to your organization.
                </h5>
              </div>
            </div>
          </Parallax>

          <Parallax
            opacity={[0, 2]}
            translateY={['100%', '-50%']}
            scale={[2, 0.8]}
          >
            <div className='flex flex-col items-center justify-center lg-custom:flex-row'>
              <div className='relative flex flex-col items-end text-right mr-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:mr-10'>
                <h3 className='text-[1.5rem] leading-[1.5rem] text-dark uppercase font-main-heavy [text-shadow:-1px_1px_var(--color-bright),1px_1px_var(--color-bright),-1px_-1px_var(--color-bright),1px_-1px_var(--color-bright)] w-[15ch] mb-[0.4em] leading-[1.1em]'>
                  Planning and new business director
                </h3>
                <div className='hidden absolute right-[-2.95em] top-8 bg-third w-3 h-3 lg-custom:block'></div>
                <p className='text-[0.8rem] font-main-light uppercase w-[25ch]'>
                  Circus | <span className='text-third font-main-regular'>2011 ~ 2015</span>
                </p>
                <ul className='text-[0.8rem] font-main-regular leading-4 text-right mt-1 uppercase'>
                  <li>Presentations</li>
                  <li>Leadership</li>
                  <li>Sales</li>
                </ul>
              </div>

              <div className='flex flex-col items-start text-left mt-4 ml-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:ml-10'>
                <h6 className='font-main-semibold text-[0.8rem] text-third uppercase'>Why is it good for you?</h6>
                <h5 className='font-main-semibold text-[1.2rem] leading-[1.5rem] mt-2 uppercase lg-custom:w-[25ch]'>
                  Through listening, <br></br>strategy, and effective
                  communication, I will present my ideas, negotiating and
                  optimizing results on multiple fronts.
                </h5>
              </div>
            </div>
          </Parallax>

          <Parallax
            opacity={[0, 2]}
            translateY={['100%', '-50%']}
            scale={[2, 0.8]}
          >
            <div className='flex flex-col items-center justify-center lg-custom:flex-row'>
              <div className='relative flex flex-col items-end text-right mr-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:mr-10'>
                <h3 className='text-[1.5rem] leading-[1.5rem] text-dark uppercase font-main-heavy [text-shadow:-1px_1px_var(--color-bright),1px_1px_var(--color-bright),-1px_-1px_var(--color-bright),1px_-1px_var(--color-bright)] w-[15ch] mb-[0.4em] leading-[1.1em]'>Client Services Director</h3>
                <div className='hidden absolute right-[-2.95em] top-8 bg-third w-3 h-3 lg-custom:block'></div>
                <p className='text-[0.8rem] font-main-light uppercase w-[25ch]'>
                  WE | <span className='text-third font-main-regular'>2008 ~ 2010</span>
                </p>
                <p className='text-[0.8rem] font-main-light uppercase w-[25ch]'>
                  Rapp Collins |{' '}
                  <span className='text-third font-main-regular'>2007 ~ 2008</span>
                </p>
                <ul className='text-[0.8rem] font-main-regular leading-4 text-right mt-1 uppercase'>
                  <li>Leadership</li>
                  <li>Business & Financial</li>
                  <li>Problem Solving</li>
                </ul>
              </div>

              <div className='flex flex-col items-start text-left mt-4 ml-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:ml-10'>
                <h6 className='font-main-semibold text-[0.8rem] text-third uppercase'>Why is it good for you?</h6>
                <h5 className='font-main-semibold text-[1.2rem] leading-[1.5rem] mt-2 uppercase lg-custom:w-[25ch]'>
                  I will listen closely to customers to understand and discover
                  their real needs.
                </h5>
              </div>
            </div>
          </Parallax>

          <Parallax
            opacity={[0, 2]}
            translateY={['100%', '-50%']}
            scale={[2, 0.8]}
          >
            <div className='flex flex-col items-center justify-center lg-custom:flex-row'>
              <div className='relative flex flex-col items-end text-right mr-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:mr-10'>
                <h3 className='text-[1.5rem] leading-[1.5rem] text-dark uppercase font-main-heavy [text-shadow:-1px_1px_var(--color-bright),1px_1px_var(--color-bright),-1px_-1px_var(--color-bright),1px_-1px_var(--color-bright)] w-[15ch] mb-[0.4em] leading-[1.1em] uppercase'>
                  Advertising <br></br>and digital marketing manager
                </h3>
                <div className='hidden absolute right-[-2.95em] top-8 bg-third w-3 h-3 lg-custom:block'></div>
                <p className='text-[0.8rem] font-main-light uppercase w-[25ch]'>
                  Peugeot-Citroën Automobile |{' '}
                  <span className='text-third font-main-regular'>2000 ~ 2007</span>
                </p>
                <ul className='text-[0.8rem] font-main-regular leading-4 text-right mt-1 uppercase'>
                  <li>Critical Thinking</li>
                  <li>Strategy & Criativity</li>
                  <li>Keen eye for design</li>
                </ul>
              </div>

              <div className='flex flex-col items-start text-left mt-4 ml-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:ml-10'>
                <h6 className='font-main-semibold text-[0.8rem] text-third uppercase'>Why is it good for you?</h6>
                <h5 className='font-main-semibold text-[1.2rem] leading-[1.5rem] mt-2 uppercase lg-custom:w-[25ch]'>
                  I will use my experience in campaign evaluation, critical
                  thinking, and a keen eye for design to provide my opinion so
                  the team can develop the best digital product.
                </h5>
              </div>
            </div>
          </Parallax>
        </section>

        <section className='hidden lg-custom:grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] auto-rows-[150px] grid-flow-dense gap-5 mt-[15em] mb-20 mx-12'>
          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic01}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setOneShown(true)}
              onMouseLeave={() => setOneShown(false)}
            />
            {oneShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>WE 2008</p> : null}
          </div>

          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic02}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setTwoShown(true)}
              onMouseLeave={() => setTwoShown(false)}
            />
            {twoShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2017</p> : null}
          </div>

          <div className='relative'>
            <Image
              src={WhyPic03}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setThirteenShown(true)}
              onMouseLeave={() => setThirteenShown(false)}
            />
            {thirteenShown ? (
              <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2019</p>
            ) : null}
          </div>

          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic04}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setFourShown(true)}
              onMouseLeave={() => setFourShown(false)}
            />
            {fourShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Citroën 2007</p> : null}
          </div>

          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic05}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setFiveShown(true)}
              onMouseLeave={() => setFiveShown(false)}
            />
            {fiveShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>WE 2008</p> : null}
          </div>

          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic06}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setSixShown(true)}
              onMouseLeave={() => setSixShown(false)}
            />
            {sixShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2020</p> : null}
          </div>

          <div className='relative'>
            <Image
              src={WhyPic07}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setSevenShown(true)}
              onMouseLeave={() => setSevenShown(false)}
            />
            {sevenShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2016</p> : null}
          </div>

          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic08}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setEightShown(true)}
              onMouseLeave={() => setEightShown(false)}
            />
            {eightShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2014</p> : null}
          </div>

          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic09}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setNineShown(true)}
              onMouseLeave={() => setNineShown(false)}
            />
            {nineShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Citroën 2006</p> : null}
          </div>

          <div className='relative grid-row-span-2 row-span-2'>
            <Image
              src={WhyPic10}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setTenShown(true)}
              onMouseLeave={() => setTenShown(false)}
            />
            {tenShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2020</p> : null}
          </div>

          <div className='relative'>
            <Image
              src={WhyPic11}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setElevenShown(true)}
              onMouseLeave={() => setElevenShown(false)}
            />
            {elevenShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2019</p> : null}
          </div>

          <div className='relative'>
            <Image
              src={WhyPic12}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setTwelveShown(true)}
              onMouseLeave={() => setTwelveShown(false)}
            />
            {twelveShown ? (
              <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Rapp Collins 2008</p>
            ) : null}
          </div>
          <div className='relative'>
            <Image
              src={WhyPic13}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setThreeShown(true)}
              onMouseLeave={() => setThreeShown(false)}
            />
            {threeShown ? <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2012</p> : null}
          </div>

          <div className='relative'>
            <Image
              src={WhyPic14}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setFourteenShown(true)}
              onMouseLeave={() => setFourteenShown(false)}
            />
            {fourteenShown ? (
              <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Rapp Collins 2007</p>
            ) : null}
          </div>

          <div className='relative'>
            <Image
              src={WhyPic15}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setFifteenShown(true)}
              onMouseLeave={() => setFifteenShown(false)}
            />
            {fifteenShown ? (
              <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Circus 2013</p>
            ) : null}
          </div>

          <div className='relative'>
            <Image
              src={WhyPic16}
              alt='gallery element'
              className='w-full h-full opacity-30 saturate-0 object-contain hover:opacity-100 hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              onMouseEnter={() => setSixteenShown(true)}
              onMouseLeave={() => setSixteenShown(false)}
            />
            {sixteenShown ? (
              <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.8rem] uppercase leading-4 -translate-x-1/2 animate-subtitle-why-appear'>Rapp Collins 2007</p>
            ) : null}
          </div>
        </section>
      </div>
    </section>
  );
};

export default WhyMe;
