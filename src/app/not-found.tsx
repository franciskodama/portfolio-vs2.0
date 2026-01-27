'use client';

import BlinkingText from '@/components/BlinkingText';
import Link from 'next/link';

const NotFound = () => {
  return (
    <section className='section h-screen flex justify-center items-center bg-dark relative overflow-hidden'>
      <div
        className='absolute inset-0 z-0 opacity-20 pointer-events-none'
        style={{
          backgroundImage:
            'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className='container relative z-10 mx-auto text-center flex flex-col items-center gap-8 px-4'>
        <div className='relative w-full h-full max-w-lg translate-y-15  -rotate-12 overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]'>
          <img
            src='./assets/images/error-page/error-page.webp'
            alt='System Glitch'
            className='w-full h-full object-cover opacity-80'
          />
          <div className='absolute inset-0 bg-linear-to-t from-dark/80 to-transparent'></div>
        </div>

        <div>
          <h1 className='z-10 rotate-8 mb-4 text-[16rem] font-main-heavy text-bright leading-none tracking-tighter'>
            404
          </h1>
          <h2 className='-rotate-4 mt-8 text-6xl text-third font-main-semibold uppercase tracking-widest mb-6 mix-blend-difference select-none animate-pulse'>
            <BlinkingText tag='span' text={'System Failure'} />
          </h2>
          <p className='-rotate-12 w-[32ch] mt-8 text-left text-bright font-main-light max-w-md mx-auto leading-relaxed'>
            <BlinkingText
              tag='span'
              text={
                'We seem to have lost this page in the void. It might have been deleted, or maybe it never existed.'
              }
            />
          </p>
        </div>

        <Link
          href='/'
          className='rotate-6 mt-12 px-8 py-3 border border-third text-third font-main-semibold uppercase tracking-widest hover:bg-third hover:text-dark transition-all duration-300'
        >
          Reboot System
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
