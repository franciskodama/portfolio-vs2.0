'use client';

import { useRef } from 'react';
import * as LucideIcons from 'lucide-react';

const ProjectCard = ({
  project,
  onClick,
}: {
  project: any;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = (LucideIcons as any)[project.icon];

  return (
    <div className='relative'>
      <div
        ref={cardRef}
        className='group relative flex flex-col text-left cursor-pointer'
        onClick={onClick}
      >
        <div
          className='relative w-[320px] rounded-[50px] border-2 border-dark bg-bright pt-8 px-8 pb-4 cursor-pointer transition-all duration-200 ease-in-out
         [box-shadow:var(--color-dark)_0px_0px_0px_0px_inset,var(--color-bright)_-10px_10px_0px_-1px,var(--color-bright)_0px_0]
         hover:translate-x-[10px] hover:-translate-y-[10px]
         hover:[box-shadow:var(--color-bright)_0px_0px_0px_0px_inset,var(--color-dark)_-10px_10px_0px_-1px,var(--color-dark)_-10px_10px]
         hover:text-dark hover:bg-[radial-gradient(#000000_0.5px,#fff_0.5px)]
         hover:bg-size-[10px_10px] md-custom:w-[320px] md-custom:h-[320px]'
        >
          <div className='flex justify-between'>
            {Icon && (
              <Icon
                className='w-[25px] h-[25px] md-custom:w-8 md-custom:h-8'
                strokeWidth={1.6}
              />
            )}
            {project.highlight && (
              <LucideIcons.Star
                className='w-[25px] h-[25px] md-custom:w-8 md-custom:h-8'
                strokeWidth={1.6}
                fill='yellow'
              />
            )}
          </div>
          <div className='flex flex-col justify-between mt-4 h-[77%] w-[15em]'>
            <div>
              <h3 className='font-main-bold text-[1.4rem] leading-9 pb-[0.1em] uppercase md-custom:text-[2.25rem]'>
                {project.titleA}
              </h3>
              <h3 className='hidden lowercase text-third font-main-semibold text-[1.2rem] md-custom:block md-custom:text-[1.8rem]'>
                {project.titleB}
              </h3>
              <h3 className='mt-2 font-main-semibold uppercase text-[0.9rem] text-third'>
                {project.tech}
              </h3>
            </div>
            <p className='text-[0.9rem] font-main-regular self-end mr-8'>
              {project.category}
            </p>
          </div>
        </div>
        {/* <p className='absolute top-0 left-0 font-main-regular text-[0.8rem] mt-[0.8em] md-custom:text-[1rem] md-custom:mt-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {project.frontText}
        </p> */}
      </div>
    </div>
  );
};

export default ProjectCard;
