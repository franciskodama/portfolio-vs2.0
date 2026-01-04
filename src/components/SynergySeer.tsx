'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import WhyCard from '../components/WhyCard';
import { whyData } from '../data/Data';

const SynergySeer = ({ color }: { color: { first: boolean; second: boolean; third: boolean } }) => {
  const [status, setStatus] = useState('Brew Potion');
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: ''
  });
  
  const [result, setResult] = useState<any>(null);
  const [isResultActive, setIsResultActive] = useState(false);
  
  let imageRightHand = null;
  let imageLeftHand = null;

  if (color.first) {
    imageRightHand = require('../assets/images/hand-right-black-bg.png');
    imageLeftHand = require('../assets/images/hand-left-black-bg.png');
  } else if (color.second) {
    imageRightHand = require('../assets/images/hand-right-blue-bg.png');
    imageLeftHand = require('../assets/images/hand-left-blue-bg.png');
  } else if (color.third) {
    imageRightHand = require('../assets/images/hand-right-grey-bg.png');
    imageLeftHand = require('../assets/images/hand-left-grey-bg.png');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Summoning...');
    setIsResultActive(false);

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
        setIsResultActive(true);
        setStatus('BREW ANOTHER');
        setFormData({ company: '', position: '', description: '' });
      } else {
        console.error('Error from AI API:', data.message);
        console.error('Full Error Data:', data);
        if (data.error) alert(`Gemini Error: ${data.error}`);
        setStatus('CLOUDED - TRY AGAIN');
        setTimeout(() => setStatus('Brew Potion'), 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('OFFLINE - TRY AGAIN');
      setTimeout(() => setStatus('Brew Potion'), 3000);
    }
  };

  return (
    <section className='section relative pb-40' id='ai'>
      <div className='container pt-4 w-[90%] mx-auto mb-8 md-custom:w-[80%]'>
        <h1 className='section-title'>Synergy Seer</h1>
        <p className='my-[0.8em_0_5em_0] text-center mb-12'>
            {`I'm the missing piece that fits your specific puzzle.`}
        </p>
        
        <form className='flex flex-col items-center' onSubmit={onSubmit}>
          <div className='text-third border border-dashed border-third rounded-[10px] p-4 mb-16 text-center max-w-2xl'>
            <h2 className='font-main-semibold mb-4 uppercase tracking-wider'>
                     The Ritual of Recruitment
            </h2>
            <p className='font-main-light text-[0.9rem] leading-[1.6] text-bright'>
              Type the name of your company, the desired position, and paste the job description if you have it. 
              The crystal ball will reveal the compatibility potion and predict our first 90 days together.
            </p>
          </div>
          
          <div className='relative flex justify-center items-center w-full mb-12'>
            {imageLeftHand && (
            <Image
              className='absolute left-[-5%] w-[7.5em] animate-hand-left md-custom:w-[15em] lg-custom:w-[22em] z-[3] pointer-events-none'
              src={imageLeftHand}
              alt='hand over crystal ball'
            />
            )}
            
            <div className='relative flex flex-col items-center justify-center w-[20em] h-[20em] rounded-full p-8 md-custom:w-[35em] md-custom:h-[35em] md-custom:p-20 overflow-hidden [box-shadow:0_-2.5em_4em_2em_rgba(255,255,255,0.4),inset_0_-2.5em_1.5em_1em_rgba(0,0,0,0.1)] border-2 border-black/20 z-[2] bg-bright'>
              <div className='flex flex-col gap-3 w-full max-w-[250px] md-custom:max-w-[400px] z-10'>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  className="bg-transparent border-b border-dark/20 p-2 text-center text-dark placeholder:text-dark/40 focus:outline-none focus:border-third transition-colors"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Target Position"
                  className="bg-transparent border-b border-dark/20 p-2 text-center text-dark placeholder:text-dark/40 focus:outline-none focus:border-third transition-colors"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Paste Job Description (optional)"
                  className="bg-transparent border border-dark/10 rounded-lg p-3 h-24 md-custom:h-32 text-dark placeholder:text-dark/40 focus:outline-none focus:border-third transition-colors text-sm resize-none"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Magical Glow effect inside */}
              <div className='absolute inset-0 bg-gradient-to-t from-third/10 to-transparent pointer-events-none animate-pulse'></div>
            </div>

            {imageRightHand && (
            <Image
              className='absolute right-[-5%] w-[8.5em] animate-hand-right md-custom:w-[15em] lg-custom:w-[22em] z-[3] pointer-events-none'
              src={imageRightHand}
              alt='hand over crystal ball'
            />
            )}
          </div>

          <button
            className='btn btn--third-color'
            type='submit'
            disabled={status === 'Summoning...'}
            style={{
              backgroundColor:
                status === 'Summoning...'
                  ? 'var(--color-dark)'
                  : 'var(--color-third)',
            }}
          >
            {status}
          </button>
        </form>

        {isResultActive && result && (
          <div className='mt-20 w-full max-w-4xl mx-auto animate-result-ai-appear'>
            <div className='bg-bright p-8 md-custom:p-12 rounded-[20px] shadow-2xl border-t-4 border-third'>
              <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-8'>
                <div className='text-center md:text-left'>
                  <h3 className='text-dark font-main-heavy text-4xl mb-2 uppercase tracking-tighter'>Compatibility Potion</h3>
                  <p className='text-dark/60 font-main-regular'>The stars have aligned for our future.</p>
                </div>
                <div className='relative flex items-center justify-center'>
                   <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-dark/10"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * result.score) / 100}
                      className="text-third transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className='absolute flex flex-col items-center justify-center'>
                    <span className='text-dark font-main-heavy text-3xl'>{result.score}%</span>
                    <span className='text-dark/50 text-[0.6rem] uppercase font-bold'>Match</span>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                <div>
                  <h4 className='text-third font-main-semibold uppercase text-sm tracking-widest mb-6 border-b border-third/20 pb-2'>Core Ingredients</h4>
                  <div className='flex flex-wrap gap-3'>
                    {result.ingredients.map((ing: string, i: number) => (
                      <span key={i} className='px-4 py-2 bg-dark text-bright rounded-full text-xs font-main-medium uppercase tracking-wider shadow-md hover:scale-105 transition-transform'>
                        {ing}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className='text-third font-main-semibold uppercase text-sm tracking-widest mt-12 mb-6 border-b border-third/20 pb-2'>The Prophecy</h4>
                  <p className='text-dark font-main-regular italic text-lg leading-relaxed'>
                    "{result.prediction}"
                  </p>
                </div>

                <div className='bg-dark/5 p-6 rounded-xl border border-dark/5'>
                  <h4 className='text-third font-main-semibold uppercase text-sm tracking-widest mb-6 border-b border-third/20 pb-2'>First 90 Days High-Impact Projects</h4>
                  <ul className='flex flex-col gap-6'>
                    {result.projects.map((project: string, i: number) => (
                      <li key={i} className='flex gap-4 items-start group'>
                        <span className='flex-shrink-0 w-8 h-8 rounded-full bg-third text-dark flex items-center justify-center font-main-bold text-sm group-hover:scale-110 transition-transform'>
                          {i + 1}
                        </span>
                        <p className='text-dark font-main-regular text-sm leading-6'>{project}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
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
