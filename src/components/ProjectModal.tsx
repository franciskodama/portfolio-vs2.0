'use client';

import Image from 'next/image';
import IconClose from '../assets/images/card-icon-close-white.svg';
import Line from '../assets/images/line-cracked.svg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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
          {/* xl-custom:items-center */}
          <div className='flex flex-col justify-center w-[90%] max-w-[80em] mx-auto xl-custom:flex-row md-custom:mt-18'>
            <div className='flex flex-col mt-18 md-custom:mt-0 pb-4 items-center xl-custom:pb-0 xl-custom:w-1/2'>
              <div className='flex flex-col w-fit mx-auto xl-custom:mx-0 xl-custom:items-start items-center'>
                <h2 className='font-main-heavy text-[2rem] text-dark leading-10 capitalize text-center xl-custom:text-left'>
                  {project.title}
                </h2>
                <h3 className='font-main-semibold text-[1.2rem] mt-2 mb-4 text-bright text-center xl-custom:text-left'>
                  {project.year}
                </h3>
                {project.images && project.images.length > 0 ? (
                  <div className='flex items-center gap-1 md-custom:gap-2 mx-auto'>
                    <Carousel className='flex items-center gap-2 group w-full'>
                      <CarouselPrevious className='static translate-y-0 left-auto top-auto border-none' />

                      <div className='w-[70vw] md-custom:w-[28em] xl-custom:w-[30em]'>
                        <CarouselContent className='cursor-grab active:cursor-grabbing'>
                          {project.images.map((img: any, index: number) => (
                            <CarouselItem key={index}>
                              {img.image && (
                                <Image
                                  className='block w-full h-[24em] [box-shadow:-2em_2em_rgba(0,0,0,0.1)] md-custom:h-[35em] xl-custom:h-[42em] object-cover'
                                  src={img.image}
                                  alt={`project image ${index + 1}`}
                                />
                              )}
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </div>

                      <CarouselNext className='static translate-y-0 right-auto top-auto border-none' />
                    </Carousel>
                  </div>
                ) : project.image ? (
                  <Image
                    className='block w-[18em] h-[24em] mx-auto [box-shadow:-2em_2em_rgba(0,0,0,0.1)] md-custom:w-[25em] md-custom:h-[35em] xl-custom:w-[32em] xl-custom:h-[42em]'
                    src={project.image}
                    alt='main project'
                  />
                ) : null}
                {project.visitIcon ? (
                  <a
                    className='block relative mt-4 text-right cursor-pointer'
                    href={project.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <p className="font-main-semibold text-[1rem] text-bright before:absolute before:bottom-[-0.1em] before:right-0 before:content-[''] before:w-[5.9rem] before:h-px before:border-b-2 before:border-bright">
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

            <div className='flex flex-col pb-4 mt-12 md-custom:mt-0 xl-custom:w-1/2 xl-custom:items-center'>
              <div className='w-[18em] self-center md-custom:w-[30em]'>
                <p className='font-main-semibold text-[1rem] text-bright text-left mb-6 md-custom:mt-0 xl-custom:text-right'>
                  {project.category}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleOne}
                </h4>
                <p className='w-[29ch] text-[0.9rem] font-main-regular md-custom:text-[1rem] md-custom:w-[42ch]'>
                  {project.backText_textOne}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleTwo}
                </h4>
                <p className='w-[29ch] text-[0.9rem] font-main-regular md-custom:text-[1rem] md-custom:w-[42ch]'>
                  {project.backText_textTwo}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleThree}
                </h4>
                <p className='w-[29ch] text-[0.9rem] font-main-regular md-custom:text-[1rem] md-custom:w-[42ch] md-custom:mb-0'>
                  {project.backText_textThree}
                </p>

                <h4 className='font-main-heavy text-dark text-[1.1rem] mt-6 mb-2'>
                  {project.backText_titleFour}
                </h4>
                <p className='w-[29ch] text-[0.9rem] font-main-regular md-custom:text-[1rem] md-custom:w-[42ch] md-custom:mb-0'>
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
