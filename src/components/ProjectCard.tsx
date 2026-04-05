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
          className='relative w-[150px] h-[150px] md-custom:w-[270px] md-custom:h-[270px] rounded-[30px]
         md:rounded-[50px] border-2 border-dark bg-bright p-6 cursor-pointer transition-all duration-200 ease-in-out
         [box-shadow:var(--color-dark)_0px_0px_0px_0px_inset,var(--color-bright)_-10px_10px_0px_-1px,var(--color-bright)_0px_0]
         hover:translate-x-[10px] hover:-translate-y-[10px]
         hover:[box-shadow:var(--color-bright)_0px_0px_0px_0px_inset,var(--color-dark)_-10px_10px_0px_-1px,var(--color-dark)_-10px_10px]
         hover:text-dark hover:bg-[radial-gradient(#000000_0.5px,#fff_0.5px)]
         hover:bg-size-[10px_10px]'
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
              <h3 className='font-main-bold w-[10ch] md-custom:w-full text-[1rem] leading-5 md-custom:leading-8 uppercase md-custom:text-[2rem]'>
                {project.name}
              </h3>
              <h3 className='hidden md-custom:block w-[25ch] mt-4 font-main-regular uppercase text-[0.8rem] text-third leading-5'>
                {project.tech}
              </h3>
            </div>
            <p className='hidden md-custom:block text-[0.8rem] font-main-regular self-end mr-8'>
              {project.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
