'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import WhyCard from '../components/WhyCard';
import { whyData } from '../data/Data';
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

  /* Hand Image Logic */
  const handImages = {
    first: {
      right: require('../assets/images/hand-right-black-bg.png'),
      left: require('../assets/images/hand-left-black-bg.png'),
    },
    second: {
      right: require('../assets/images/hand-right-blue-bg.png'),
      left: require('../assets/images/hand-left-blue-bg.png'),
    },
    third: {
      right: require('../assets/images/hand-right-grey-bg.png'),
      left: require('../assets/images/hand-left-grey-bg.png'),
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
    setStatus('Summoning...');
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

  const baseInputClass =
    'bg-transparent border-0 p-2 text-center text-dark placeholder:text-dark/40 focus:outline-none focus:border-third transition-colors w-full';

  return (
    <section className='section relative pb-40' id='ai'>
      <div className='container pt-4 w-[90%] mx-auto mb-8 md-custom:w-[80%]'>
        <h1 className='section-title'>Synergy Seer</h1>
        <p className='my-[0.8em_0_5em_0] text-center mb-12'>
          {`I'm the missing piece that fits your specific puzzle.`}
        </p>

        <form className='flex flex-col items-center' onSubmit={onSubmit}>
          <div className='text-third border border-dashed border-third p-4 mb-16 text-center max-w-2xl'>
            <h2 className='font-main-semibold mb-4 uppercase tracking-wider'>
              The Ritual of Recruitment
            </h2>
            <p className='font-main-light text-[0.9rem] leading-[1.6] text-bright w-[45ch] p-4'>
              Type the name of your company, the title of this role, and paste
              the job description if you have one.
              <br />
              <br /> The crystal ball will then reveal the compatibility
              prophecy and predict our first 90 days together.
            </p>
          </div>

          <div className='relative flex justify-center items-center w-full mt-32 mb-12'>
            {imageLeftHand && (
              <div className='absolute top-[-15%] left-1/2 z-1 pointer-events-none transform -translate-x-full -ml-2 w-[7.5em] md-custom:w-[15em] lg-custom:w-[22em]'>
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
                  placeholder='Type here your company name'
                  className={baseInputClass}
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type='text'
                  name='position'
                  placeholder='Type here the title position'
                  className={baseInputClass}
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name='description'
                  placeholder='Paste here the job description (optional)'
                  className={`${baseInputClass} p-3 h-24 md-custom:h-32 text-sm resize-none`}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className='absolute inset-0 bg-linear-to-t from-third/10 to-transparent pointer-events-none animate-pulse'></div>
            </div>

            {imageRightHand && (
              <div className='absolute top-[-15%] left-1/2 z-1 pointer-events-none transform ml-2 w-[8.5em] md-custom:w-[15em] lg-custom:w-[22em]'>
                <Image
                  className='w-full animate-hand-right'
                  src={imageRightHand}
                  alt='hand over crystal ball'
                />
              </div>
            )}
          </div>

          <button
            className='btn btn--third-color'
            type='submit'
            disabled={status === 'Divining...'}
            style={{
              backgroundColor:
                status === 'Divining...'
                  ? 'var(--color-dark)'
                  : 'var(--color-third)',
            }}
          >
            {status}
          </button>
        </form>

        {result && <SynergyResult result={result} />}
      </div>
      <WhyCard
        titleOne={whyData.ai.titleOne}
        textOne={whyData.ai.textOne}
        titleTwo={whyData.ai.titleTwo}
        textTwo={whyData.ai.textTwo}
        titleThree={whyData.ai.titleThree}
        textThree={whyData.ai.textThree}
        titleFour={whyData.ai.titleFour}
        textFour={whyData.ai.textFour}
        observation={whyData.ai.observation}
        bottom={whyData.ai.bottom}
        left={whyData.ai.left}
      />
    </section>
  );
};

export default SynergySeer;
