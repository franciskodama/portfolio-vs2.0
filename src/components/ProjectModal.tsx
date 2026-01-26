'use client';

import React from 'react';
import Image from 'next/image';
import IconClose from '../assets/images/card-icon-close-white.svg';
import Line from '../assets/images/line-cracked.svg';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHeader,
} from '@/components/ui/drawer';

interface ProjectModalProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  // If no project is selected yet, we don't render the drawer content specifics
  // But we render the Drawer wrapper to handle logic if needed, or just return null
  // However, relying on parent to handle state

  if (!project) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className='h-[90vh] border-none outline-none'
        style={{ backgroundColor: project.backgroundColor }}
      >
        <div className='sr-only'>
          <DrawerHeader>
            <DrawerTitle>{project.titleA}</DrawerTitle>
            <DrawerDescription>{project.frontText}</DrawerDescription>
          </DrawerHeader>
        </div>

        <div className='flex flex-col w-full h-full overflow-y-auto overflow-x-hidden relative'>
          <DrawerClose className='absolute right-[5%] top-[2%] z-50'>
            <Image
              className='w-8 cursor-pointer hover:opacity-70 transition-opacity'
              src={IconClose}
              alt='close button'
            />
          </DrawerClose>

          <div className='flex flex-col justify-center w-[90%] max-w-[80em] mx-auto py-16 xl-custom:flex-row xl-custom:items-center'>
            <div className='flex flex-col pb-4 xl-custom:pb-0 xl-custom:w-1/2 xl-custom:items-center'>
              <div className='w-[18em] self-center md-custom:w-[22.5em]'>
                <h2 className='font-main-heavy text-[2.7rem] text-dark leading-10 capitalize'>
                  {project.titleA}
                </h2>
                <h3 className='font-main-semibold text-[1.2rem] mb-4 text-bright'>
                  {project.year}
                </h3>
                <Image
                  className='block w-[15em] h-[20em] ml-8 [box-shadow:-2em_2em_rgba(0,0,0,0.1)] md-custom:w-[20.25em] md-custom:h-[28.85em] xl-custom:w-[22.5em] xl-custom:h-[31em]'
                  src={project.image}
                  alt='main project'
                />
                {project.visitIcon ? (
                  <a
                    className='block relative mt-12 text-right cursor-pointer'
                    href={project.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <p className="font-main-semibold text-[1.25rem] text-bright before:absolute before:bottom-[-0.1em] before:right-0 before:content-[''] before:w-[7.4rem] before:h-px before:border-b-2 before:border-bright">
                      visit project
                    </p>
                  </a>
                ) : null}
              </div>
            </div>

            <Image
              src={Line}
              alt='line separation'
              className='block w-[60em] animate-line-movement p-4 mt-8 xl-custom:hidden'
            />

            <div className='flex flex-col pb-4 xl-custom:w-1/2 xl-custom:items-center'>
              <div className='w-[18em] self-center md-custom:w-[22.5em]'>
                <p className='font-main-semibold text-[1.25rem] text-bright text-left mt-6 mb-6 md-custom:mt-10 xl-custom:text-right'>
                  {project.category}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleOne}
                </h4>
                <p className='w-[30ch] text-[0.9rem] font-main-regular md-custom:text-[1rem] md-custom:w-[35ch]'>
                  {project.backText_textOne}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleTwo}
                </h4>
                <p className='w-[30ch] text-[0.9rem] font-main-regular md-custom:text-[1rem] md-custom:w-[35ch]'>
                  {project.backText_textTwo}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleThree}
                </h4>
                <p className='w-[30ch] text-[0.9rem] font-main-regular mb-20 md-custom:text-[1rem] md-custom:w-[35ch] md-custom:mb-0'>
                  {project.backText_textThree}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleFour}
                </h4>
                <p className='w-[30ch] text-[0.9rem] font-main-regular mb-20 md-custom:text-[1rem] md-custom:w-[35ch] md-custom:mb-0'>
                  {project.backText_textFour}
                </p>

                <a
                  className='hidden font-main-semibold text-bright bg-black/10 text-[0.8rem] md-custom:block'
                  href={project.backText_link}
                  target='_blank'
                  rel='noreferrer'
                >
                  {project.backText_linkName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectModal;
