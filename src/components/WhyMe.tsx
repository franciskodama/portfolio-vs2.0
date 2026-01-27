'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';
import { jobs } from '../data/Data';
import Balloon from './icons/Balloon';
import AvatarRoulette from './AvatarRoulette';

const galleryData = [
  { id: '01', caption: 'WE 2008', span: true },

  { id: '02', caption: 'Circus 2017', span: true },
  { id: '03', caption: 'Circus 2019', span: false },
  { id: '04', caption: 'Citroën 2007', span: true },
  { id: '05', caption: 'WE 2008', span: true },
  { id: '06', caption: 'Circus 2020', span: true },
  { id: '07', caption: 'Circus 2016', span: false },
  { id: '08', caption: 'Circus 2014', span: true },
  { id: '09', caption: 'Citroën 2006', span: true },
  { id: '10', caption: 'Circus 2020', span: true },
  { id: '11', caption: 'Circus 2019', span: false },
  { id: '12', caption: 'Rapp Collins 2008', span: false },
  { id: '13', caption: 'Circus 2012', span: false },
  { id: '14', caption: 'Rapp Collins 2007', span: false },
  { id: '15', caption: 'Circus 2013', span: false },
  { id: '16', caption: 'Rapp Collins 2007', span: false },
  { id: '17', caption: 'Citroën 2006', span: false },
  { id: '18', caption: 'THE LNK 2022', span: false },
  { id: '19', caption: 'Citroën 2003', span: false },
  { id: '20', caption: 'WE 2008', span: false },
  { id: '21', caption: 'WE 2009', span: false },
  { id: '22', caption: 'RAPP COLLINS 2008', span: false },
  { id: '23', caption: 'CIRCUS 2018', span: false },
  { id: '24', caption: 'Citroën 2004', span: false },
  { id: '25', caption: 'THE LNK 2023', span: false },
  { id: '26', caption: 'Citroën 2005', span: false },
  { id: '27', caption: 'THE LNK 2022', span: false },
  { id: '28', caption: 'Citroën France 2003', span: false },
  { id: '29', caption: 'RAPP COLLINS 2008', span: false },
  { id: '30', caption: 'THE LNK 2023', span: false },
  { id: '31', caption: 'Citroën 2002', span: false },
  { id: '32', caption: 'THE LNK 2023', span: false },
];

const WhyMe = () => {
  const [heartShown, setHeartShown] = useState(false);

  return (
    <section className='section bg-dark' id='whyme'>
      <div className='container mt-20 mb-24 max-w-[80%] mx-auto lg-custom:max-w-full'>
        <h1 className='section-title mt-20'>Why Me?</h1>
        <p className='mt-[0.8em] mb-20 text-center'>
          The opportunity to have a fully<br></br>qualified professional in your
          team.
        </p>

        <div
          className='relative mx-auto w-fit z-10 pr-10'
          style={{
            animation:
              'circle-appear 1s ease-in-out forwards, balloon-float 6s ease-in-out infinite',
          }}
        >
          <Balloon
            variant='filled'
            heartShown={heartShown}
            color='var(--color-third)'
            size='43em'
            rotate={13}
          >
            <div className='flex flex-col items-left text-left ml-10 mb-35 rotate-[-25deg]'>
              <h4 className='w-[8ch] text-dark mb-[0.8em] leading-[1.3rem] text-[1.5rem] uppercase font-main-heavy'>
                Whole package
              </h4>
              <p className='w-[15ch] text-[1.1rem] font-main-regular leading-[1.4rem]'>
                Maturity, organization, strategic view, and much more from 24
                years of experience.
              </p>
            </div>
          </Balloon>

          <Balloon
            variant='outlined'
            heartShown={heartShown}
            color='var(--color-third)'
            size='43em'
            rotate={13}
          >
            {/* <div className='flex flex-col items-left text-left ml-10 mb-35 rotate-[-25deg]'>
              <h4 className='uppercase font-main-heavy text-[1.2rem] text-dark [text-shadow:-1px_1px_var(--color-bright),1px_1px_var(--color-bright),-1px_-1px_var(--color-bright),1px_-1px_var(--color-bright)]'>
                PASSION
              </h4>
              <div className='w-[15ch] font-main-regular text-third text-[0.9rem] leading-[1.1rem]'>
                My career in marketing <br></br> spanned more than two decades,
                and I achieved important positions I had planned.
              </div>
            </div> */}
          </Balloon>

          {/* <div
            className='absolute left-1/2 -translate-x-1/2 -bottom-[25px] flex flex-col bg-third rounded-full w-[4.5em] h-[4.5em] items-center p-[0.8em] border-2 border-dark cursor-pointer'
            onClick={() => setHeartShown(!heartShown)}
          >
            <h4 className='w-[8ch] font-main-semibold text-dark mb-1 text-[0.5rem] leading-2 text-center uppercase'>
              Why changing careers?
            </h4>
            <p className='font-main-regular text-[0.5rem] leading-2 text-center uppercase w-[5ch]'>
              Click here
            </p>
          </div> */}
        </div>

        <section className='flex flex-col items-center relative lg-custom:after:content-[""] lg-custom:after:absolute lg-custom:after:top-0 lg-custom:after:left-1/2 lg-custom:after:-translate-x-1/2 lg-custom:after:h-[85%] lg-custom:after:w-[3px] lg-custom:after:bg-third'>
          {jobs.map((job) => (
            <Parallax
              key={job.id}
              opacity={[0, 2]}
              translateY={['100%', '-50%']}
              scale={[2, 0.8]}
            >
              <div className='flex flex-col items-center justify-center lg-custom:flex-row'>
                <div className='relative flex flex-col items-end text-right mr-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:mr-10'>
                  <h3 className='text-[1.5rem] leading-6 text-bright uppercase font-main-regular'>
                    {/* <h3 className='text-[1.5rem] leading-6 text-dark uppercase font-main-heavy [text-shadow:-1px_1px_var(--color-bright),1px_1px_var(--color-bright),-1px_-1px_var(--color-bright),1px_-1px_var(--color-bright)] w-[15ch] mb-[0.4em]'> */}
                    {job.title}
                  </h3>
                  <div className='hidden absolute right-[-2.95em] top-8 bg-third w-3 h-3 lg-custom:block'></div>
                  {job.companies.map((company, index) => (
                    <p
                      key={index}
                      className='text-[0.8rem] font-main-light uppercase w-[25ch]'
                    >
                      {company.name} |{' '}
                      <span className='text-third font-main-regular'>
                        {company.period}
                      </span>
                    </p>
                  ))}
                  <ul className='text-[0.8rem] font-main-regular leading-4 text-right mt-1 uppercase'>
                    {job.skills.map((skill, index) => (
                      <p key={index}>{skill}</p>
                    ))}
                  </ul>
                </div>

                <div className='flex flex-col items-start text-left mt-4 ml-0 w-[85%] lg-custom:w-[25em] lg-custom:my-8 lg-custom:ml-10'>
                  <h6 className='font-main-semibold text-[0.8rem] text-third uppercase tracking-widest'>
                    Why is it good for you?
                  </h6>
                  <h5 className='font-main-light text-[1rem] leading-7 mt-2 lg-custom:w-[30em]'>
                    {job.benefit}
                  </h5>
                </div>
              </div>
            </Parallax>
          ))}
        </section>

        <AvatarRoulette />

        <section className='grid grid-cols-2 lg-custom:grid-cols-8 grid-flow-dense gap-5 mt-[15em] mb-20 mx-12 lg-custom:w-[80%] lg-custom:mx-auto'>
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
