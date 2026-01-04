'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import WhyCard from '../components/WhyCard';
import { whyData } from '../data/Data';

const SynergySeer = ({ color }: { color: { first: boolean; second: boolean; third: boolean } }) => {
  const [status, setStatus] = useState('Ask me');
  const [prompt, setPrompt] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [result, setResult] = useState('');
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Thinking...');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
        setIsResultActive(true);
        setNewPrompt(prompt);
        setStatus('ASK ME AGAIN');
        setPrompt('');
      } else {
        console.error('Error from AI API:', data.message);
        setStatus('ERROR - TRY AGAIN');
        setTimeout(() => {
          setStatus('Ask me');
        }, 3000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('ERROR - TRY AGAIN');
      setTimeout(() => {
        setStatus('Ask me');
      }, 3000);
    }
  };

  return (
    <section className='section relative pb-40' id='ai'>
      <div className='container pt-4 w-[90%] mx-auto mb-8 md-custom:w-[80%]'>
        <h1 className='section-title'>Synergy Seer</h1>
        <p className='my-[0.8em_0_5em_0] text-center mb-12'>
            {`I’m the missing piece that fits your specific puzzle.`}
        </p>
        <form className='flex flex-col items-center' onSubmit={onSubmit}>
          <div className='text-third border border-dashed border-third rounded-[10px] p-4 mb-28 text-center'>
            <h2 className='font-main-semibold mb-4'>
                     See our future at your company
            </h2>
            <ul className='flex flex-col gap-2'>
              <li className='font-main-light text-[1rem] leading-[1.8] text-bright list-decimal list-inside text-left'>
                Suggest a drama movie based on a true story with a good score on
                the rotten tomatoes website.
              </li>
              <li className='font-main-light text-[1rem] leading-[1.8] text-bright list-decimal list-inside text-left'>
                I need a gift suggestion for my wife. She is 35 years old and
                loves to work out and challenge herself.
              </li>
              <li className='font-main-light text-[1rem] leading-[1.8] text-bright list-decimal list-inside text-left'>
                Correct this to standard English: She no went to the market.
              </li>
              <li className='font-main-light text-[1rem] leading-[1.8] text-bright list-decimal list-inside text-left'>
                Write a recipe based on these ingredients: meat, cheddar cheese,
                onions, sour cream, and rice.
              </li>
            </ul>
          </div>
          
          <div className='pr-10 relative flex justify-center items-center w-full'>
            {imageLeftHand && (
            <Image
              className='absolute left-0 w-[7.5em] animate-hand-left md-custom:w-[15em] lg-custom:w-[22em]'
              src={imageLeftHand}
              alt='hand over crystal ball'
            />
            )}
            
            <textarea
              className='text-center w-[20em] h-[20em] rounded-full p-20 mb-4 overflow-hidden [box-shadow:0_-2.5em_4em_2em_rgba(255,255,255,0.4),inset_0_-2.5em_1.5em_1em_rgba(0,0,0,0.1)] border-2 border-black/20 z-[2] text-dark bg-bright md-custom:w-[35em] md-custom:h-[35em] md-custom:p-[15em_5em]'
              name='prompt'
              placeholder='Ask me anything, but at your own risk.'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />

            {imageRightHand && (
            <Image
              className='absolute right-0 w-[8.5em] animate-hand-right md-custom:w-[15em] lg-custom:w-[22em]'
              src={imageRightHand}
              alt='hand over crystal ball'
            />
            )}
          </div>

          <button
            className='btn btn--third-color mt-4'
            type='submit'
            style={{
              backgroundColor:
                status === 'Thinking...'
                  ? 'var(--color-dark)'
                  : 'var(--color-third)',
            }}
          >
            {status}
          </button>
        </form>

        <ul
          className={`mt-4 w-3/5 mx-auto text-dark font-main-light leading-[1.5] animate-result-ai-appear ${isResultActive ? 'flex' : 'hidden'} flex-col-reverse`}
        >
          <li className='text-left p-4 bg-bright mb-4 rounded-[10px] md-custom:px-8'>
            <div className='flex'>
              <h4 className='py-2 w-1/4 font-main-medium text-[0.8rem] md-custom:text-[1rem] md-custom:w-1/5'>Your question:</h4>
              <p className='py-2 px-4 w-3/4 md-custom:w-4/5 md-custom:pl-0'>{newPrompt}</p>
            </div>
            <div className='flex'>
              <h4 className='py-2 w-1/4 font-main-medium text-[0.8rem] md-custom:text-[1rem] md-custom:w-1/5'>My wisdom:</h4>
              <p className='py-2 px-4 w-3/4 md-custom:w-4/5 md-custom:pl-0'>{result}</p>
            </div>
          </li>
        </ul>
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
