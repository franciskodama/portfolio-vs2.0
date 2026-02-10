'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SynergyResult from './SynergyResult';

const SynergySeer = ({
  color,
}: {
  color: { first: boolean; second: boolean; third: boolean };
}) => {
  const [status, setStatus] = useState('Consult the Seer');
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
  });

  const [result, setResult] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        const headerHeight = 84; // Header height estimate
        const elementPosition = resultRef.current.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [result]);

  const handImages = {
    first: {
      right: require('../assets/images/hands/hand-right-black-bg.png'),
      left: require('../assets/images/hands/hand-left-black-bg.png'),
    },
    second: {
      right: require('../assets/images/hands/hand-right-blue-bg.png'),
      left: require('../assets/images/hands/hand-left-blue-bg.png'),
    },
    third: {
      right: require('../assets/images/hands/hand-right-grey-bg.png'),
      left: require('../assets/images/hands/hand-left-grey-bg.png'),
    },
  };

  const activeKey = (Object.keys(color) as Array<keyof typeof color>).find(
    (key) => color[key]
  );
  const { right: imageRightHand, left: imageLeftHand } = activeKey
    ? handImages[activeKey]
    : { right: null, left: null };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Divining...');
    setResult(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setStatus('CONSULT AGAIN');
        setFormData({ company: '', position: '', description: '' });
      } else {
        console.error('Error from AI API:', data.message);
        console.error('Full Error Data:', data);
        if (data.error) alert(`Synergy Seer Error: ${data.error}`);
        setStatus('CLOUDED - TRY AGAIN');
        setTimeout(() => setStatus('Consult the Seer'), 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('OFFLINE - TRY AGAIN');
      setTimeout(() => setStatus('Consult the Seer'), 3000);
    }
  };

  const handleCloseResult = () => {
    setResult(null);
    setStatus('CONSULT THE SEER');
  };

  const crystalBallInputClass =
    'bg-transparent border-0 py-2 px-0 text-center md-custom:text-lg text-dark md-custom:placeholder:text-lg placeholder:text-dark/40 placeholder:px-0 focus:outline-none focus:border-third transition-colors w-full';
  // !font-[family-name:var(--font-henny-penny)] !placeholder:font-[family-name:var(--font-henny-penny)]

  return (
    <section className='section relative pb-40 mt-10' id='ai'>
      <div className='container pt-4 w-[90%] mx-auto mb-8 md-custom:w-[80%]'>
        <div className='relative flex flex-col items-center'>
          <svg viewBox='0 0 500 120' className='w-full h-auto overflow-visible'>
            <path
              id='curve-title'
              d='M 50 120 Q 250 10 450 120'
              fill='transparent'
            />
            <text width='1500'>
              <textPath
                href='#curve-title'
                startOffset='50%'
                textAnchor='middle'
                className='font-main-regular text-white uppercase tracking-wider fill-current text-[3.2rem] md-custom:text-[2.6rem] lg-custom:text-[1.4rem]'
                style={{ fontFamily: 'var(--font-henny-penny)' }}
              >
                Synergy Seer
              </textPath>
            </text>
          </svg>
          <svg
            viewBox='0 0 500 120'
            className='absolute top-10 md-custom:top-12 lg-custom:top-22 w-[80%] h-auto overflow-visible text-third'
          >
            <path id='curve' d='M 50 120 Q 250 10 450 120' fill='transparent' />
            <text width='500'>
              <textPath
                href='#curve'
                startOffset='50%'
                textAnchor='middle'
                className='font-main-semibold uppercase tracking-wider fill-current text-[1.6rem] md-custom:text-[1.2rem] lg-custom:text-[1rem]'
                style={{ fontFamily: 'var(--font-henny-penny)' }}
              >
                The Ritual of Recruitment
              </textPath>
            </text>
          </svg>
        </div>
        <form className='flex flex-col items-center' onSubmit={onSubmit}>
          <div className='text-third p-4 my-8 text-center max-w-2xl w-full'>
            <div className='relative flex justify-between gap-12 max-w-[42ch] mx-auto mb-12'>
              <div className='flex flex-col items-end flex-1'>
                <div className='w-10 h-10 md-custom:mr-4 rounded-full border border-third text-third flex items-center justify-center font-main-regular mb-4 bg-dark z-10 shadow-[0_0_15px_rgba(237,28,36,0.2)]'>
                  1
                </div>
                <p className='text-right font-main-light text-[0.9rem] leading-[1.6] text-bright'>
                  Type the name of your company, the title of this role, and
                  paste the job description if you have one.
                </p>
              </div>

              <div className='flex flex-col flex-1'>
                <div className='w-10 h-10 md-custom:ml-4 rounded-full border border-third text-third flex items-center justify-center font-main-regular mb-4 bg-dark z-10 shadow-[0_0_15px_rgba(237,28,36,0.2)]'>
                  2
                </div>
                <p className='text-left font-main-light text-[0.9rem] leading-[1.6] text-bright'>
                  The crystal ball will then reveal the compatibility prophecy
                  and predict our first 90 days together.
                </p>
              </div>
            </div>
          </div>

          <div className='relative flex justify-center items-center w-full mt-12 md-custom:mt-32 mb-12'>
            {imageLeftHand && (
              <div className='absolute top-[0%] md-custom:top-[-8%] lg-custom:top-[-15%] left-[42%] lg-custom:left-[50%] z-1 pointer-events-none transform -translate-x-full w-[7.5em] md-custom:w-[15em] lg-custom:w-[22em]'>
                <Image
                  className='w-full animate-hand-left'
                  src={imageLeftHand}
                  alt='hand over crystal ball'
                />
              </div>
            )}

            <div className='relative flex flex-col items-center justify-center mt-32 w-[20em] h-[20em] rounded-full p-8 md-custom:w-[35em] md-custom:h-[35em] md-custom:p-20 overflow-hidden [box-shadow:0_-2.5em_4em_2em_rgba(255,255,255,0.4),inset_0_-2.5em_1.5em_1em_rgba(0,0,0,0.1)] border-2 border-black/20 z-2 bg-bright'>
              <div className='flex flex-col gap-6 w-full max-w-[250px] md-custom:max-w-[400px] z-10'>
                <input
                  type='text'
                  name='company'
                  placeholder='Your company name'
                  className={crystalBallInputClass}
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type='text'
                  name='position'
                  placeholder='Title job position'
                  className={crystalBallInputClass}
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name='description'
                  placeholder='Paste here the job description (optional)'
                  className={`${crystalBallInputClass} py-3 h-24 md-custom:h-32 text-sm resize-none`}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className='absolute inset-0 bg-linear-to-t from-third/10 to-transparent pointer-events-none animate-pulse'></div>
            </div>

            {imageRightHand && (
              <div className='absolute top-[0%] md-custom:top-[-8%] lg-custom:top-[-15%] left-[45%] lg-custom:left-[50%] z-1 pointer-events-none transform w-[8.5em] md-custom:w-[15em] lg-custom:w-[22em]'>
                <Image
                  className='w-full animate-hand-right'
                  src={imageRightHand}
                  alt='hand over crystal ball'
                />
              </div>
            )}
          </div>

          <div className='relative'>
            <div className='absolute -left-36 md-custom:-left-62 -top-[40px] w-[80px] md-custom:w-[120px] pointer-events-none z-10'>
              <p
                className='absolute bottom-16 md-custom:bottom-22 -left-6 md-custom:-left-8 text-white text-[1.2rem] md-custom:text-[1.5rem] leading-6 -rotate-12 translate-x-2'
                style={{ fontFamily: 'var(--font-gloria)' }}
              >
                click
                <br />
                here
              </p>
              <svg
                viewBox='0 0 120 120'
                className='w-full h-full overflow-visible text-white mt-2 rotate-6 scale-y-75'
              >
                <path
                  d='M 10 50 Q 60 100 110 20'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  markerEnd='url(#arrowhead)'
                  strokeLinecap='round'
                />
                <defs>
                  <marker
                    id='arrowhead'
                    markerWidth='10'
                    markerHeight='10'
                    refX='9'
                    refY='3'
                    orient='auto'
                    markerUnits='strokeWidth'
                  >
                    <path d='M0,0 L0,6 L9,3 z' fill='currentColor' />
                  </marker>
                </defs>
              </svg>
            </div>
            <button
              type='submit'
              disabled={status === 'Divining...'}
              className='absolute left-1/2 top-4 md-custom:top-0 transform -translate-x-1/2 w-[200px] md-custom:w-[300px] -mt-30 md-custom:-mt-33 group cursor-pointer not-first-of-type:focus:outline-none transition-transform hover:scale-105 active:scale-95'
              // style={{ fontFamily: 'var(--font-henny-penny)' }}
              aria-label={status}
            >
              <svg
                viewBox='0 0 300 160'
                className='w-full h-full overflow-visible'
              >
                <defs>
                  <filter
                    id='glow'
                    x='-20%'
                    y='-20%'
                    width='140%'
                    height='140%'
                  >
                    <feGaussianBlur stdDeviation='5' result='blur' />
                    <feComposite
                      in='SourceGraphic'
                      in2='blur'
                      operator='over'
                    />
                  </filter>
                </defs>
                <path
                  d='M 0 30 Q 150 100 300 30 L 300 100 Q 150 170 0 100 Z'
                  fill={
                    status === 'Divining...'
                      ? 'var(--color-dark)'
                      : 'var(--color-third)'
                  }
                  className='transition-colors duration-300 shadow-xl group-hover:filter-[url(#glow)]'
                />
                <path
                  id='curve-btn'
                  d='M 0 80 Q 150 150 300 80'
                  fill='transparent'
                />
                <text width='300'>
                  <textPath
                    href='#curve-btn'
                    startOffset='50%'
                    textAnchor='middle'
                    className='font-main-regular uppercase tracking-normal fill-white text-[1.4rem] pointer-events-none'
                  >
                    {status}
                  </textPath>
                </text>
              </svg>
            </button>
          </div>
        </form>

        <div ref={resultRef}>
          {result && (
            <SynergyResult result={result} onClose={handleCloseResult} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SynergySeer;
