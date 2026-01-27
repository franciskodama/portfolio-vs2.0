'use client';

import { useState } from 'react';
import Image from 'next/image';
import { galleryData, jobs } from '../data/Data';

const WhyMe = () => {
  const [heartShown, setHeartShown] = useState(false);

  return (
    <section className='section max-w-[94em] mx-auto bg-dark' id='whyme'>
      <div className='container flex flex-col items-start mt-20 mb-24 max-w-[80%] lg-custom:max-w-full'>
        <div className='w-full bg-dark py-20 overflow-hidden'>
          <div className='z-10 max-w-[90%] mx-auto'>
            <div className='flex justify-between items-end mb-32'>
              <h1 className='section-title'>Why Me?</h1>
              <div className='text-right'>
                <h2 className='text-[1.5rem] font-main-semibold uppercase leading-none'>
                  Code with a Director’s perspective.
                </h2>
                <p className='text-third text-[1.2rem] font-main-light'>
                  I don't just build features; I build business outcomes.
                </p>
              </div>
            </div>

            <div className='flex flex-col'>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className='group border-b border-white/10 px-4 py-8 cursor-pointer transition-all hover:bg-white/5'
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex flex-row gap-8'>
                      <div className='text-third/50 leading-4.5 group-hover:text-third text-[1rem] font-main-semibold capitalize transition-colors duration-300'>
                        <h4 className='px-1'>{job.companies[0].periodStart}</h4>
                        {job.companies[0].periodEnd === 'TODAY' ? (
                          <h4 className='text-bright text-[0.8rem] bg-third/50 group-hover:text-bright px-1'>
                            {job.companies[0].periodEnd}
                          </h4>
                        ) : (
                          <h4 className='px-1'>{job.companies[0].periodEnd}</h4>
                        )}
                      </div>

                      <div className='flex flex-col gap-1'>
                        <h3 className='text-bright/50 group-hover:text-bright text-[2.4rem] font-main-regular capitalize leading-none transition-colors duration-300'>
                          {job.title}
                        </h3>
                        <div className='flex items-center gap-2'>
                          <h3 className='text-third/50 group-hover:text-third text-[1.2rem] font-main-regular capitalize leading-none transition-colors duration-300'>
                            {job.companies[0].name}
                          </h3>
                          <div className='text-2xl text-third/50 group-hover:text-third'>
                            {job.companies[0].country}
                          </div>
                        </div>
                      </div>
                      {job.id === 8 && (
                        <p
                          className='w-[12ch] ml-4 text-center text-third font-bold text-[1rem] leading-6 -rotate-15 tracking-widest'
                          style={{ fontFamily: 'var(--font-gloria)' }}
                        >
                          Why become a dev?
                        </p>
                      )}
                    </div>

                    <div className='max-w-120 text-right text-bright/50 group-hover:text-bright transition-colors duration-300'>
                      {job.skills.length <= 4 ? (
                        <div className='flex flex-col gap-1'>
                          {job.skills.map((skill, index) => (
                            <h4
                              key={index}
                              className='leading-6 tracking-widest text-[1rem] font-main-regular capitalize'
                            >
                              {skill}
                            </h4>
                          ))}
                        </div>
                      ) : (
                        <h4 className='leading-6 tracking-widest text-[1rem] font-main-regular capitalize'>
                          {job.skills.join(', ')}
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className='grid grid-cols-2 lg-custom:grid-cols-8 grid-flow-dense gap-5 mt-[5em] mb-20 mx-12 lg-custom:w-[90%] lg-custom:mx-auto'>
          {galleryData.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden ${
                item.span ? 'row-span-2' : 'aspect-square'
              } group w-full h-full`}
            >
              <Image
                src={require(`../assets/images/why-pic-${item.id}.jpg`)}
                alt='gallery element'
                className='w-full h-full opacity-30 saturate-0 object-cover group-hover:opacity-100 group-hover:saturate-100 transition-all duration-500 ease-in-out cursor-pointer'
              />
              <p className='absolute text-center left-1/2 bottom-0 text-bright [text-shadow:-1px_1px_var(--color-dark)] font-main-light text-[0.6rem] uppercase leading-4 -translate-x-1/2 hidden group-hover:block animate-subtitle-why-appear'>
                {item.caption}
              </p>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default WhyMe;
