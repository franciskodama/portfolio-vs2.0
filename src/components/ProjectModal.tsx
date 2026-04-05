'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import IconClose from '../assets/images/card-icon-close-white.svg';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHeader,
} from '@/components/ui/drawer';
import { XIcon } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ParallaxImageBlock = ({
  imgData,
  altText,
  containerRef,
}: {
  imgData: any;
  altText: string;
  containerRef: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: ['start end', 'end start'],
  });

  // High-visibility horizontal shift (parallax) for the legend
  const xParallax = useTransform(scrollYProgress, [0, 1], [-700, 700]);
  // Vertical fade/shift for the image container itself
  const yFade = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <motion.div
      ref={ref}
      style={{ y: yFade }}
      className='w-[90vw] md-custom:w-[80vw] max-w-7xl mb-16 md-custom:mb-24 relative flex flex-col items-center group'
    >
      <div className='w-full rounded-lg overflow-hidden shadow-[0_2rem_4rem_rgba(0,0,0,0.1)] bg-black/5 transition-transform duration-700 ease-out group-hover:scale-[1.02]'>
        <Image
          src={imgData.image}
          alt={altText}
          className='w-full h-auto object-cover'
        />
      </div>

      {imgData.legend && (
        <motion.div
          style={{ x: xParallax }}
          className='bg-slate-800 border border-white/60 absolute -bottom-6 w-[80%] md-custom:w-auto left-[10%] md-custom:left-8 backdrop-blur-xl px-6 py-2 shadow-lg z-20 pointer-events-none'
        >
          <p className='text-white font-main-medium text-sm md-custom:text-[0.85rem] tracking-wide leading-relaxed'>
            {imgData.legend}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!project) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className='h-dvh md-custom:h-[96vh] border-none outline-none overflow-hidden'
        style={{ backgroundColor: project.backgroundColor }}
      >
        <div className='sr-only'>
          <DrawerHeader>
            <DrawerTitle>{project.title}</DrawerTitle>
            <DrawerDescription>{project.category}</DrawerDescription>
          </DrawerHeader>
        </div>

        {/* Floating Close Button that stays visible or top-right anchored */}
        {/* We place it absolute to the scrolling container so it scrolls away like the rest of the header, but isolated */}

        <div
          ref={scrollContainerRef}
          className='flex flex-col w-full h-full overflow-y-auto overflow-x-hidden relative scroll-smooth bg-black/5'
        >
          {/* Sticky Top Right Actions */}
          <div className='sticky top-6 right-0 z-50 flex justify-end px-6 md:px-12 pointer-events-none h-0 w-full'>
            <div className='flex flex-col items-end gap-3 pointer-events-auto'>
              <DrawerClose className='focus:outline-none group'>
                <div className='p-3 transition-all duration-300'>
                  <XIcon
                    strokeWidth={1.4}
                    className='w-8 h-8 transition-transform group-hover:rotate-90 cursor-pointer'
                    style={{ color: project.textColor || '#1c1c1c' }}
                  />
                </div>
              </DrawerClose>
            </div>
          </div>

          <div className='w-full flex flex-col items-center px-4 md:px-12 pt-6 pb-32'>
            {/* Logo Group */}
            <div className='flex flex-col items-center justify-center pointer-events-none mb-4 md-custom:mb-10'>
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt='Project Logo'
                  className='max-w-[220px] h-14 md-custom:h-16 w-48 object-contain my-10'
                />
              ) : (
                <h2
                  className='font-main-heavy text-3xl md-custom:text-4xl mb-2 tracking-tight'
                  style={{ color: project.textColor || '#1c1c1c' }}
                >
                  {project.title}
                </h2>
              )}
              {project.showName && project.name && (
                <h3
                  className='font-main-heavy uppercase text-2xl md-custom:text-5xl mb-2 tracking-tight'
                  style={{ color: project.textColor || '#1c1c1c' }}
                >
                  {project.name}
                </h3>
              )}
              {project.tagline && (
                <p
                  className='font-main-medium tracking-widest text-sm md-custom:text-base opacity-90 uppercase text-center px-4'
                  style={{ color: project.textColor || '#1c1c1c' }}
                >
                  {project.tagline}
                </p>
              )}

              {/* Year & Visit Link */}
              <div className='flex flex-col items-center mt-16 gap-2 pointer-events-auto'>
                <span
                  className='font-main-heavy text-base md-custom:text-lg opacity-90'
                  style={{ color: project.titlesColor || '#1c1c1c' }}
                >
                  {project.year}
                </span>
                {project.visitIcon && (
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-[0.6rem] md-custom:text-xs font-main-heavy opacity-80 hover:opacity-100 uppercase tracking-[0.2em] border-b pb-1 mt-4 transition-all'
                    style={{
                      color: project.textColor || '#1c1c1c',
                      borderColor: project.textColor
                        ? `${project.textColor}4D`
                        : 'rgba(28,28,28,0.3)',
                    }}
                  >
                    Visit Project
                  </a>
                )}
              </div>
            </div>

            {/* Dynamic Layout for Projects With Array of Images */}
            {project.images && project.images.length > 0 ? (
              <>
                {/* Info Block 1 (WHY & WHAT) */}
                <div className='w-[85vw] md-custom:w-[70vw] max-w-5xl grid grid-cols-1 md-custom:grid-cols-2 gap-12 md-custom:gap-24 mb-16 md-custom:mb-32 mt-4 md-custom:mt-16 items-start px-4'>
                  <div>
                    <h4
                      className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase mb-6'
                      style={{ color: project.titlesColor || '#1c1c1c' }}
                    >
                      {project.backText_titleOne}
                    </h4>
                    <p
                      className='font-main-light text-lg md-custom:text-[1.1rem] leading-relaxed'
                      style={{ color: project.textColor || '#1c1c1c' }}
                    >
                      {project.backText_textOne}
                    </p>
                  </div>
                  <div>
                    <h4
                      className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase mb-6'
                      style={{ color: project.titlesColor || '#1c1c1c' }}
                    >
                      {project.backText_titleThree}
                    </h4>
                    <p
                      className='font-main-light text-lg md-custom:text-[1.1rem] leading-relaxed'
                      style={{ color: project.textColor || '#1c1c1c' }}
                    >
                      {project.backText_textThree}
                    </p>
                  </div>
                </div>

                {/* First Image Hero */}
                <ParallaxImageBlock
                  imgData={project.images[0]}
                  altText='Hero Image'
                  containerRef={scrollContainerRef}
                />

                {/* Info Block 2 (HOW & RESULT) */}
                <div className='w-[85vw] md-custom:w-[70vw] max-w-5xl grid grid-cols-1 md-custom:grid-cols-2 gap-12 md-custom:gap-24 mb-16 md-custom:mb-48 items-start px-4'>
                  <div>
                    <h4
                      className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase mb-6'
                      style={{ color: project.titlesColor || '#1c1c1c' }}
                    >
                      {project.backText_titleTwo}
                    </h4>
                    <p
                      className='font-main-light text-lg md-custom:text-[1.1rem] leading-relaxed'
                      style={{ color: project.textColor || '#1c1c1c' }}
                    >
                      {project.backText_textTwo}
                    </p>
                  </div>
                  <div>
                    <h4
                      className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase mb-6'
                      style={{ color: project.titlesColor || '#1c1c1c' }}
                    >
                      {project.backText_titleFour}
                    </h4>
                    <p
                      className='font-main-light text-lg md-custom:text-[1.1rem] leading-relaxed'
                      style={{ color: project.textColor || '#1c1c1c' }}
                    >
                      {project.backText_textFour}
                    </p>
                  </div>
                </div>

                {/* Render remaining images dynamically */}
                {project.images.slice(1).map((imgData: any, i: number) => (
                  <ParallaxImageBlock
                    key={i}
                    imgData={imgData}
                    altText={`Feature Image ${i + 1}`}
                    containerRef={scrollContainerRef}
                  />
                ))}
              </>
            ) : (
              /* Fallback Layout For Single Image Projects (Portfolio V1, etc) */
              <>
                <div className='w-[85vw] md-custom:w-[70vw] max-w-5xl grid grid-cols-1 md-custom:grid-cols-2 gap-12 md-custom:gap-24 mb-16 md-custom:mb-24 mt-4 md-custom:mt-8 items-start px-4'>
                  <div className='flex flex-col gap-12'>
                    <div>
                      <h4
                        className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase opacity-60 mb-6'
                        style={{ color: project.titlesColor || '#1c1c1c' }}
                      >
                        {project.backText_titleOne}
                      </h4>
                      <p
                        className='font-main-regular text-lg md-custom:text-[1.3rem] leading-relaxed'
                        style={{ color: project.textColor || '#1c1c1c' }}
                      >
                        {project.backText_textOne}
                      </p>
                    </div>
                    <div>
                      <h4
                        className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase opacity-60 mb-6'
                        style={{ color: project.titlesColor || '#1c1c1c' }}
                      >
                        {project.backText_titleTwo}
                      </h4>
                      <p
                        className='font-main-regular text-lg md-custom:text-[1.3rem] leading-relaxed'
                        style={{ color: project.textColor || '#1c1c1c' }}
                      >
                        {project.backText_textTwo}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-12'>
                    <div>
                      <h4
                        className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase opacity-60 mb-6'
                        style={{ color: project.titlesColor || '#1c1c1c' }}
                      >
                        {project.backText_titleThree}
                      </h4>
                      <p
                        className='font-main-regular text-lg md-custom:text-[1.3rem] leading-relaxed'
                        style={{ color: project.textColor || '#1c1c1c' }}
                      >
                        {project.backText_textThree}
                      </p>
                    </div>
                    <div>
                      <h4
                        className='font-main-heavy text-[0.7rem] md-custom:text-sm tracking-[0.2em] uppercase opacity-60 mb-6'
                        style={{ color: project.titlesColor || '#1c1c1c' }}
                      >
                        {project.backText_titleFour}
                      </h4>
                      <p
                        className='font-main-regular text-lg md-custom:text-[1.3rem] leading-relaxed'
                        style={{ color: project.textColor || '#1c1c1c' }}
                      >
                        {project.backText_textFour}
                      </p>
                    </div>
                  </div>
                </div>

                {project.image && (
                  <ParallaxImageBlock
                    imgData={{ image: project.image, legend: null }}
                    altText='Main Project'
                    containerRef={scrollContainerRef}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectModal;
