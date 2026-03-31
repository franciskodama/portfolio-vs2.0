'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import IconClose from '../assets/images/card-icon-close-white.svg';
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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringImg, setIsHoveringImg] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  if (!project) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className='h-dvh md-custom:h-[96vh] border-none outline-none overflow-hidden md-custom:rounded-t-[2.5rem]'
        style={{ backgroundColor: project.backgroundColor }}
      >
        <div className='sr-only'>
          <DrawerHeader>
            <DrawerTitle>{project.title}</DrawerTitle>
            <DrawerDescription>{project.category}</DrawerDescription>
          </DrawerHeader>
        </div>

        {/* Custom EXPLORE Cursor */}
        <AnimatePresence>
          {isHoveringImg && (
            <motion.div
              className='fixed w-24 h-24 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-none z-50 text-dark font-main-heavy tracking-widest text-[0.6rem] shadow-xl border border-white/20 uppercase mix-blend-overlay'
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: cursorPos.x - 48,
                y: cursorPos.y - 48,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.5,
              }}
            >
              Explore
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex flex-col w-full h-full overflow-y-auto overflow-x-hidden relative scroll-smooth bg-black/5'>
          {/* Header */}
          <div className='sticky top-0 z-40 w-full px-6 py-6 flex items-start justify-between bg-linear-to-b from-black/10 to-transparent backdrop-blur-[2px] transition-all'>
            <DrawerClose className='z-50 focus:outline-none group'>
              <div className='bg-dark/10 p-3 rounded-full hover:bg-dark/20 transition-all duration-300'>
                <Image
                  src={IconClose}
                  alt='close button'
                  className='w-5 h-5 transition-transform group-hover:rotate-90'
                />
              </div>
            </DrawerClose>

            <div className='flex flex-col items-center justify-center translate-y-2 pointer-events-none'>
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt='Project Logo'
                  className='max-w-[180px] h-10 w-auto object-contain mb-2 drop-shadow-md'
                />
              ) : (
                <h2 className='font-main-heavy text-2xl text-dark mb-1 tracking-tight'>{project.title}</h2>
              )}
              {project.tagline && (
                <p className='font-main-medium tracking-wide text-sm text-dark opacity-90'>
                  {project.tagline}
                </p>
              )}
            </div>

            <div className='flex flex-col items-end pt-2 pr-2'>
              <span className='font-main-semibold text-lg text-dark opacity-90'>
                {project.year}
              </span>
              {project.visitIcon && (
                <a
                  href={project.url}
                  target='_blank'
                  rel='noreferrer'
                  className='text-sm font-main-heavy text-dark opacity-80 hover:opacity-100 uppercase tracking-widest border-b border-dark/30 hover:border-dark pb-1 mt-1 transition-all'
                >
                  Visit Project
                </a>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className='w-full flex flex-col items-center pb-32 mt-4'>
             
             {/* Dynamic Layout for Projects With Array of Images */}
            {project.images && project.images.length > 0 ? (
              <>
                {/* First Image Hero */}
                <div
                  className='w-[90vw] md-custom:w-[80vw] max-w-7xl mb-16 md-custom:mb-24 rounded-4xl overflow-hidden shadow-[0_2rem_4rem_rgba(0,0,0,0.1)] relative cursor-none bg-black/5'
                  onMouseEnter={() => setIsHoveringImg(true)}
                  onMouseLeave={() => setIsHoveringImg(false)}
                >
                  <Image
                    src={project.images[0].image}
                    alt='hero'
                    className='w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out'
                  />
                </div>

                {/* Info Block 1 (WHY & WHAT) */}
                <div className='w-[85vw] md-custom:w-[70vw] max-w-5xl grid grid-cols-1 md-custom:grid-cols-2 gap-12 md-custom:gap-24 mb-16 md-custom:mb-24 items-start px-4'>
                  <div>
                    <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                      {project.backText_titleOne}
                    </h4>
                    <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                      {project.backText_textOne}
                    </p>
                  </div>
                  <div>
                    <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                      {project.backText_titleThree}
                    </h4>
                    <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                      {project.backText_textThree}
                    </p>
                  </div>
                </div>

                {/* Second Image Feature */}
                {project.images[1] && (
                  <div
                    className='w-[90vw] md-custom:w-[80vw] max-w-7xl mb-16 md-custom:mb-24 rounded-4xl overflow-hidden shadow-[0_2rem_4rem_rgba(0,0,0,0.1)] relative cursor-none bg-black/5'
                    onMouseEnter={() => setIsHoveringImg(true)}
                    onMouseLeave={() => setIsHoveringImg(false)}
                  >
                    <Image
                      src={project.images[1].image}
                      alt='feature 1'
                      className='w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out'
                    />
                  </div>
                )}

                {/* Info Block 2 (HOW & RESULT) */}
                <div className='w-[85vw] md-custom:w-[70vw] max-w-5xl grid grid-cols-1 md-custom:grid-cols-2 gap-12 md-custom:gap-24 mb-16 md-custom:mb-24 items-start px-4'>
                  <div>
                    <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                      {project.backText_titleTwo}
                    </h4>
                    <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                      {project.backText_textTwo}
                    </p>
                  </div>
                  <div>
                    <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                      {project.backText_titleFour}
                    </h4>
                    <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                      {project.backText_textFour}
                    </p>
                  </div>
                </div>

                {/* Third Image Final */}
                {project.images[2] && (
                  <div
                    className='w-[90vw] md-custom:w-[80vw] max-w-7xl mb-12 rounded-4xl overflow-hidden shadow-[0_2rem_4rem_rgba(0,0,0,0.1)] relative cursor-none bg-black/5'
                    onMouseEnter={() => setIsHoveringImg(true)}
                    onMouseLeave={() => setIsHoveringImg(false)}
                  >
                    <Image
                      src={project.images[2].image}
                      alt='feature 2'
                      className='w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out'
                    />
                  </div>
                )}
              </>
            ) : (
              /* Fallback Layout For Single Image Projects (Portfolio V1, etc) */
              <>
                 <div
                    className='w-[90vw] md-custom:w-[80vw] max-w-7xl mb-16 md-custom:mb-24 rounded-4xl overflow-hidden shadow-[0_2rem_4rem_rgba(0,0,0,0.1)] relative cursor-none bg-black/5'
                    onMouseEnter={() => setIsHoveringImg(true)}
                    onMouseLeave={() => setIsHoveringImg(false)}
                  >
                    {project.image && (
                      <Image
                        src={project.image}
                        alt='main project'
                        className='w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out'
                      />
                    )}
                  </div>
                  <div className='w-[85vw] md-custom:w-[70vw] max-w-5xl grid grid-cols-1 md-custom:grid-cols-2 gap-12 md-custom:gap-24 mb-16 md-custom:mb-24 items-start px-4'>
                    <div className='flex flex-col gap-12'>
                      <div>
                        <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                          {project.backText_titleOne}
                        </h4>
                        <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                          {project.backText_textOne}
                        </p>
                      </div>
                      <div>
                        <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                          {project.backText_titleTwo}
                        </h4>
                        <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                          {project.backText_textTwo}
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-12'>
                      <div>
                        <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                          {project.backText_titleThree}
                        </h4>
                        <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                          {project.backText_textThree}
                        </p>
                      </div>
                      <div>
                        <h4 className='font-main-heavy text-sm tracking-[0.2em] uppercase text-dark opacity-60 mb-6'>
                          {project.backText_titleFour}
                        </h4>
                        <p className='font-main-regular text-xl md:text-[1.3rem] text-dark leading-relaxed'>
                          {project.backText_textFour}
                        </p>
                      </div>
                    </div>
                  </div>
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectModal;

