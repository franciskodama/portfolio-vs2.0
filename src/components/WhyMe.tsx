'use client';

import { useState } from 'react';
import Image from 'next/image';
import { galleryData, jobs } from '../data/Data';
import BlinkingText from './BlinkingText';

const WhyMe = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const toggleJob = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <section className='section max-w-[94em] mx-auto bg-dark' id='whyme'>
      <div className='container flex flex-col items-start my-20 max-w-[80%] lg-custom:max-w-full'>
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
            {/* <p
              className='w-[12ch] ml-4 text-center text-third font-bold text-[1rem] leading-6 -rotate-15 tracking-widest'
              style={{ fontFamily: 'var(--font-gloria)' }}
            >
              Why become a dev?
            </p> */}

            <div className='flex flex-col'>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => toggleJob(job.id)}
                  className={`group border-b px-4 py-8 cursor-pointer transition-all duration-500 ${
                    expandedJob === job.id
                      ? 'border-white/40 bg-white/5'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex flex-row gap-8'>
                      <div
                        className={`leading-4.5 text-[1rem] font-main-semibold capitalize transition-colors duration-300 ${
                          expandedJob === job.id
                            ? 'text-third'
                            : 'text-third/50 group-hover:text-third'
                        }`}
                      >
                        <BlinkingText
                          tag='span'
                          text={job.companies[0].periodStart}
                        />
                        <span className='px-1'></span>
                        {job.companies[0].periodEnd === 'TODAY' ? (
                          <h4
                            className={`inline-block text-[0.8rem] px-1 ${
                              expandedJob === job.id
                                ? 'text-bright bg-third/80'
                                : 'text-bright bg-third/50 group-hover:text-bright'
                            }`}
                          >
                            <BlinkingText
                              tag='span'
                              text={job.companies[0].periodEnd}
                            />
                          </h4>
                        ) : (
                          <BlinkingText
                            tag='span'
                            text={job.companies[0].periodEnd}
                          />
                        )}
                      </div>

                      <div className='flex flex-col gap-1'>
                        <h3
                          className={`text-[2.4rem] font-main-regular capitalize leading-none transition-colors duration-300 ${
                            expandedJob === job.id
                              ? 'text-bright'
                              : 'text-bright/50 group-hover:text-bright'
                          }`}
                        >
                          <BlinkingText
                            tag='span'
                            text={job.title}
                            stagger={1}
                          />
                        </h3>
                        <div className='flex items-center gap-2'>
                          <h3
                            className={`text-[1.2rem] font-main-regular capitalize leading-none transition-colors duration-300 ${
                              expandedJob === job.id
                                ? 'text-third'
                                : 'text-third/50 group-hover:text-third'
                            }`}
                          >
                            <BlinkingText
                              tag='span'
                              text={job.companies[0].name}
                            />
                          </h3>
                          <div
                            className={`text-2xl transition-colors duration-300 ${
                              expandedJob === job.id
                                ? 'text-third'
                                : 'text-third/50 group-hover:text-third'
                            }`}
                          >
                            <BlinkingText
                              tag='span'
                              text={job.companies[0].country}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`max-w-120 text-right transition-colors duration-300 ${
                        expandedJob === job.id
                          ? 'text-bright'
                          : 'text-bright/50 group-hover:text-bright'
                      }`}
                    >
                      {job.skills.length <= 4 ? (
                        <div className='flex flex-col gap-1'>
                          {job.skills.map((skill, index) => (
                            <h4
                              key={index}
                              className='leading-6 tracking-widest text-[1rem] font-main-regular capitalize'
                            >
                              <BlinkingText tag='span' text={skill} />
                            </h4>
                          ))}
                        </div>
                      ) : (
                        <h4 className='leading-6 tracking-widest text-[1rem] font-main-regular capitalize'>
                          <BlinkingText
                            tag='span'
                            text={job.skills.join(', ')}
                          />
                        </h4>
                      )}
                    </div>
                  </div>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                      expandedJob === job.id
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className='overflow-hidden'>
                      <div className='pt-8 pb-2 flex items-start gap-6 border-l border-third/30 ml-2 pl-6 mt-6'>
                        <div className='flex flex-col gap-2'>
                          <h5 className='text-third font-main-semibold text-xs tracking-[0.2em] uppercase opacity-70'>
                            The Impact
                          </h5>
                          <p className='text-[1.3rem] leading-8 font-main-light text-white/90 max-w-[50ch] italic'>
                            &ldquo;{job.benefit}&rdquo;
                          </p>
                        </div>
                      </div>
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
