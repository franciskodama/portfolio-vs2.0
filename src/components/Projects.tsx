'use client';
import React from "react";
import Card from "../components/Card";
import WhyCard from "../components/WhyCard";
import { projects, whyData } from "../data/Data";
import { Parallax } from "react-scroll-parallax";

const Projects = () => {
  return (
    <section className="section bg-dark pb-60 md-custom:pb-40 lg-custom:w-full lg-custom:pb-60" id="projects">
      <div className="container mx-auto lg-custom:w-[70%]">
        <Parallax opacity={[0, 3]} scale={[1.5, 0.9]}>
          <h2 className="section-title text-center mb-4">selected projects</h2>
        </Parallax>

        <div className="flex flex-wrap justify-center w-full items-center">
          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
        <WhyCard
          titleOne={whyData.selectedProjects.titleOne}
          textOne={whyData.selectedProjects.textOne}
          titleTwo={whyData.selectedProjects.titleTwo}
          textTwo={whyData.selectedProjects.textTwo}
          titleThree={whyData.selectedProjects.titleThree}
          textThree={whyData.selectedProjects.textThree}
          titleFour={whyData.selectedProjects.titleFour}
          textFour={whyData.selectedProjects.textFour}
          observation={whyData.selectedProjects.observation}
          bottom={whyData.selectedProjects.bottom}
          left={whyData.selectedProjects.left}
        />
      </div>
    </section>
  );
};

export default Projects;
