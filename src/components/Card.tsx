'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconClose from "../assets/images/card-icon-close-white.svg";
import Line from "../assets/images/line-cracked.svg";

const Card = ({ project }: { project: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickToOpen = () => {
    setIsOpen(true);
  };

  const handleClickToClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".card-front__reveal");

      reveals.forEach((el) => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("!translate-y-0", "!opacity-100");
        } else {
          el.classList.remove("!translate-y-0", "!opacity-100");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal();

    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  return (
    <div className="relative m-2 md-custom:mx-8 xl-custom:m-8">
      {/* ========================== CARD FRONT ========================== */}
      <div
        className={`card-front__reveal relative translate-y-[100px] opacity-0 transition-all duration-1000 ease-in-out flex flex-col my-4 w-[240px] text-left md-custom:w-[270px] md-custom:my-[2em_0_1em_0] xl-custom:mt-8 xl-custom:mb-0 ${
          isOpen ? "hidden" : "flex"
        }`}
        onClick={handleClickToOpen}
      >
        <p className="text-[0.9rem] font-main-light pb-[0.8rem] md-custom:text-[1rem]">{project.category}</p>
        <div className="relative w-[240px] border border-bright bg-dark pl-4 pb-4 cursor-pointer transition-all duration-200 ease-in-out [box-shadow:var(--color-bright)_0px_0px_0px_0px_inset,var(--color-dark)_-10px_10px_0px_-1px,var(--color-bright)_0px_0px] hover:translate-x-[10px] hover:-translate-y-[10px] hover:[box-shadow:var(--color-bright)_0px_0px_0px_0px_inset,var(--color-dark)_-10px_10px_0px_-1px,var(--color-bright)_-10px_10px] hover:text-dark hover:bg-[radial-gradient(#000000_0.5px,#f6f6f6_0.5px)] hover:bg-[length:10px_10px] md-custom:w-[270px] md-custom:h-[270px]">
          <Image
            className="w-[25px] mt-4 md-custom:w-8"
            src={project.icon}
            alt="icon project"
          />
          <div className="flex flex-col justify-center h-[77%] w-[15em]">
            <h3 className="hidden lowercase text-third font-main-semibold text-[1.2rem] md-custom:block md-custom:text-[1.8rem]">{project.title0}</h3>
            <h3 className="font-main-semibold text-[1.4rem] leading-[2.25rem] pb-[0.1em] uppercase md-custom:text-[2.25rem]">{project.titleA}</h3>
            <h3 className="font-main-semibold text-[1rem] text-third uppercase md-custom:text-[1.3rem]">{project.tech}</h3>
          </div>
        </div>
        <p className="font-main-thin text-[0.9rem] mt-[0.8em] md-custom:text-[1rem] md-custom:mt-6">{project.frontText}</p>
      </div>

      {/* ========================== CARD BACK ========================== */}

      <div
        className={`fixed top-20 left-0 h-full z-[15] flex w-full text-dark bg-black/70 overflow-scroll flex-col ${
          isOpen ? "flex" : "hidden"
        }`}
        onClick={() => handleClickToClose()}
      >
        <div
          className="absolute top-full left-0 right-0 flex flex-col justify-center w-[90%] max-w-[80em] mx-auto py-16 animate-open-back-card md-custom:top-[75%] lg-custom:top-[55%] xl-custom:flex-row xl-custom:top-[45%] xl-custom:items-center"
          style={{ backgroundColor: project.backgroundColor }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            className="absolute right-[5%] top-[1.5%] w-8 cursor-pointer xl-custom:right-[3%] xl-custom:top-[3%]"
            onClick={handleClickToClose}
            src={IconClose}
            alt="close button"
          />
          <div className="flex flex-col pb-4 xl-custom:pb-0 xl-custom:w-1/2 xl-custom:items-center">
            <div className="w-[18em] self-center md-custom:w-[22.5em]">
              <h2 className="font-main-heavy text-[2.7rem] text-dark leading-[4rem] capitalize">
                <span className="lowercase text-bright">{project.title0}</span>
                {project.titleA}
              </h2>
              <h3 className="font-main-semibold text-[1.2rem] mb-4 text-bright">{project.year}</h3>
              <Image
                className="block w-[15em] h-[20em] ml-8 [box-shadow:-2em_2em_rgba(0,0,0,0.1)] md-custom:w-[20.25em] md-custom:h-[28.85em] xl-custom:w-[22.5em] xl-custom:h-[31em]"
                src={project.image}
                alt="main project"
              />
              {project.visitIcon ? (
                <a
                  className="block relative mt-12 text-right cursor-pointer"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="font-main-semibold text-[1.25rem] text-bright before:absolute before:bottom-[-0.1em] before:right-0 before:content-[''] before:w-[7.4rem] before:h-[1px] before:border-b-2 before:border-bright">visit project</p>
                </a>
              ) : null}
            </div>
          </div>

          <Image src={Line} alt="line separation" className="block w-[60em] animate-line-movement p-4 mt-8 xl-custom:hidden" />

          <div className="flex flex-col pb-4 xl-custom:w-1/2 xl-custom:items-center">
            <div className="w-[18em] self-center md-custom:w-[22.5em]">
              <p className="font-main-semibold text-[1.25rem] text-bright text-left mt-6 mb-6 md-custom:mt-10 xl-custom:text-right">{project.category}</p>

              <h4 className="font-main-heavy text-[1.1rem] mt-6 mb-2">{project.backText_titleOne}</h4>
              <p className="w-[30ch] text-[0.9rem] md-custom:text-[1rem] md-custom:w-[35ch]">{project.backText_textOne}</p>
              
              <h4 className="font-main-heavy text-[1.1rem] mt-6 mb-2">{project.backText_titleTwo}</h4>
              <p className="w-[30ch] text-[0.9rem] md-custom:text-[1rem] md-custom:w-[35ch]">{project.backText_textTwo}</p>
              
              <h4 className="font-main-heavy text-[1.1rem] mt-6 mb-2">
                {project.backText_titleThree}
              </h4>
              <p className="w-[30ch] text-[0.9rem] mb-20 md-custom:text-[1rem] md-custom:w-[35ch] md-custom:mb-0">
                {project.backText_textThree}
              </p>
              
              <h4 className="font-main-heavy text-[1.1rem] mt-6 mb-2">{project.backText_titleFour}</h4>
              <p className="w-[30ch] text-[0.9rem] mb-20 md-custom:text-[1rem] md-custom:w-[35ch] md-custom:mb-0">
                {project.backText_textFour}
              </p>
              
              <a
                className="hidden font-main-semibold text-bright bg-black/10 text-[0.8rem] md-custom:block"
                href={project.backText_link}
                target="_blank"
                rel="noreferrer"
              >
                {project.backText_linkName}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
