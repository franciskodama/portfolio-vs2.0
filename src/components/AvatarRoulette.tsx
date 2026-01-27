import { useState } from 'react';
import Image from 'next/image';
import { jobs } from '../data/Data';

const AvatarRoulette = () => {
  const [rotation, setRotation] = useState(-90);
  const [activeIndex, setActiveIndex] = useState(0);

  const rotateRoulette = (index: number) => {
    const angle = 360 / jobs.length;
    const newRotation = -angle * index - 90;
    setRotation(newRotation);
    setActiveIndex(index);
  };

  return (
    <div className='relative w-[40em] h-[40em] mx-auto my-20 hidden lg-custom:block'>
      <div
        className='absolute w-full h-full rounded-full border-2 border-third transition-transform duration-700 ease-out z-0'
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {jobs.map((job, index) => {
          const angle = (360 / jobs.length) * index;
          return (
            <div
              key={job.id}
              className='absolute top-1/2 left-1/2 w-[4em] h-[20em] -ml-[4em] -mt-[10em] transition-transform duration-700 ease-out'
              style={{
                transform: `rotate(${angle}deg) translate(24em) rotate(-${angle}deg) rotate(${-rotation}deg)`,
              }}
            >
              <div
                className={`w-full h-full overflow-visible cursor-pointer transition-all duration-300 ${
                  activeIndex === index
                    ? 'scale-150'
                    : // ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      'grayscale hover:grayscale-0 opacity-50 hover:opacity-100'
                }`}
                onClick={() => rotateRoulette(index)}
              >
                <Image
                  src={require(`../assets/images/avatar/a.png`)}
                  alt={job.title}
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Info */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22em] h-[22em] flex flex-col items-center justify-center text-center z-10 p-8 pointer-events-none'>
        <h3 className='text-bright text-[1.5rem] uppercase font-main-heavy leading-7 mb-2'>
          {jobs[activeIndex].title}
        </h3>
        <p className='text-third font-main-semibold text-[0.8rem] uppercase mb-4'>
          {jobs[activeIndex].companies[0].name} |{' '}
          {jobs[activeIndex].companies[0].period}
        </p>
        <p className='text-third font-main-regular text-[0.9rem] leading-5'>
          {jobs[activeIndex].benefit}
        </p>
      </div>

      {/* Pointer */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-t-15 border-t-bright z-20'></div>
    </div>
  );
};

export default AvatarRoulette;
