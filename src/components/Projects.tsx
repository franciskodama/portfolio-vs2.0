'use client';

import ProjectCard from './ProjectCard';
import { projects } from '../data/Data';
import { Parallax } from 'react-scroll-parallax';

const Projects = () => {
  return (
    <div className='api-external relative'>
      <section
        className='section bg-bright text-dark py-32 pb-40 w-full [clip-path:polygon(0_0,100%_0,100%_calc(100%-7.5vw),0_100%)] md-custom:py-48 md-custom:pb-56 lg-custom:py-56 lg-custom:pb-44'
        id='projects'
      >
        <div className='container mx-auto lg-custom:w-[70%]'>
          <Parallax opacity={[0, 3]} scale={[1.5, 0.9]}>
            <h2 className='section-title font-main-semibold text-center mb-4'>
              selected projects
            </h2>
          </Parallax>

          <div className='flex flex-wrap justify-center w-full items-center mb-36'>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
