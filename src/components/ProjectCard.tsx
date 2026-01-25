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
    <div className='project-card relative m-2 md-custom:mx-8 xl-custom:m-8'>
      <div
        ref={cardRef}
        className='relative flex flex-col w-[240px] text-left md-custom:w-[270px] md-custom:my-[2em_0_1em_0] xl-custom:mt-8 xl-custom:mb-0 cursor-pointer'
        onClick={onClick}
      >
        <p className='text-[0.9rem] font-main-regular pb-[0.8rem] text-third'>
          {project.category}
        </p>
        <div
          className='relative w-[240px] rounded-[50px] border-2 border-dark bg-bright pl-4 pb-4 cursor-pointer transition-all duration-200 ease-in-out
         [box-shadow:var(--color-dark)_0px_0px_0px_0px_inset,var(--color-bright)_-10px_10px_0px_-1px,var(--color-bright)_0px_0px]
         hover:translate-x-[10px] hover:-translate-y-[10px]
         hover:[box-shadow:var(--color-bright)_0px_0px_0px_0px_inset,var(--color-dark)_-10px_10px_0px_-1px,var(--color-dark)_-10px_10px]
         hover:text-dark hover:bg-[radial-gradient(#000000_0.5px,#fff_0.5px)]
         hover:bg-size-[10px_10px] md-custom:w-[270px] md-custom:h-[270px]'
        >
          {Icon && (
            <Icon
              className='w-[25px] h-[25px] mt-4 md-custom:w-8 md-custom:h-8'
              strokeWidth={1.6}
            />
          )}
          <div className='flex flex-col justify-center h-[77%] w-[15em]'>
            <h3 className='hidden lowercase text-third font-main-semibold text-[1.2rem] md-custom:block md-custom:text-[1.8rem]'>
              {project.title0}
            </h3>
            <h3 className='font-main-bold text-[1.4rem] leading-9 pb-[0.1em] uppercase md-custom:text-[2.25rem]'>
              {project.titleA}
            </h3>
            <h3 className='mt-2 font-main-semibold uppercase text-[0.9rem] text-third'>
              {project.tech}
            </h3>
          </div>
        </div>
        <p className='font-main-regular text-[0.8rem] mt-[0.8em] md-custom:text-[1rem] md-custom:mt-6'>
          {project.frontText}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
