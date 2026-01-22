import React from 'react';

interface SynergyResultProps {
  result: {
    score: number;
    ingredients: string[];
    prediction: string;
    projects: string[];
  };
}

const SynergyResult: React.FC<SynergyResultProps> = ({ result }) => {
  return (
    <div className='mt-20 w-full max-w-4xl mx-auto animate-result-ai-appear'>
      <div className='bg-bright p-8 md-custom:p-12 shadow-2xl border-t-4 border-third'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-8'>
          <div className='text-center md:text-left'>
            <h3 className='text-dark font-main-heavy text-4xl mb-2 uppercase tracking-tighter'>
              Compatibility Reading
            </h3>
            <p className='text-dark/60 font-main-regular'>
              The stars have aligned for our future.
            </p>
          </div>
          <div className='relative flex items-center justify-center'>
            <svg className='w-32 h-32 transform -rotate-90'>
              <circle
                cx='64'
                cy='64'
                r='58'
                stroke='currentColor'
                strokeWidth='8'
                fill='transparent'
                className='text-dark/10'
              />
              <circle
                cx='64'
                cy='64'
                r='58'
                stroke='currentColor'
                strokeWidth='8'
                fill='transparent'
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * result.score) / 100}
                className='text-third transition-all duration-1000 ease-out'
              />
            </svg>
            <div className='absolute flex flex-col items-center justify-center'>
              <span className='text-dark font-main-heavy text-3xl'>
                {result.score}%
              </span>
              <span className='text-dark/50 text-[0.6rem] uppercase font-bold'>
                Match
              </span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div>
            <h4 className='text-third font-main-semibold uppercase text-sm tracking-widest mb-6 border-b border-third/20 pb-2'>
              Elemental Forces
            </h4>
            <div className='flex flex-wrap gap-3'>
              {result.ingredients.map((ing: string, i: number) => (
                <span
                  key={i}
                  className='px-4 py-2 bg-dark text-bright text-xs font-main-medium uppercase tracking-wider shadow-md hover:scale-105 transition-transform'
                >
                  {ing}
                </span>
              ))}
            </div>

            <h4 className='text-third font-main-semibold uppercase text-sm tracking-widest mt-12 mb-6 border-b border-third/20 pb-2'>
              The Prophecy
            </h4>
            <p className='text-dark font-main-regular italic text-lg leading-relaxed'>
              "{result.prediction}"
            </p>
          </div>

          <div className='bg-dark/5 p-6 border border-dark/5'>
            <h4 className='text-third font-main-semibold uppercase text-sm tracking-widest mb-6 border-b border-third/20 pb-2'>
              First 90 Days High-Impact Projects
            </h4>
            <ul className='flex flex-col gap-6'>
              {result.projects.map((project: string, i: number) => (
                <li key={i} className='flex gap-4 items-start group'>
                  <span className='shrink-0 w-8 h-8 rounded-full text-white font-bold bg-third flex items-center justify-center font-main-bold text-sm group-hover:scale-110 transition-transform'>
                    {i + 1}
                  </span>
                  <p className='text-dark font-main-regular text-sm leading-6'>
                    {project}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynergyResult;
