'use client';
import React, { useRef, useEffect } from "react";
import WhyCard from "../components/WhyCard";
import { whyData } from "../data/Data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Reason = () => {
  const originalMessageBright =
    "this portfolio has been built to showcase my variety of skills from creativity to code";
  const originalMessageDark =
    ".click on the eye below to know more about each page";
  const arrOfLettersBright = Array.from(originalMessageBright);
  const arrOfLettersDark = Array.from(originalMessageDark);
  let arrOfDiv = [];

  const createGrid = () => {
    for (let i = 0; i < arrOfLettersBright.length; i++) {
      arrOfDiv.push(
        <div 
          key={i} 
          className="reason__reveal-bright border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[1.6rem] bg-dark relative opacity-0 transition-all duration-[2000ms] ease-in-out -translate-x-[1000px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]"
        >
          {arrOfLettersBright[i]}
        </div>
      );
    }
    for (let l = 0; l < arrOfLettersDark.length; l++) {
      arrOfDiv.push(
        <div 
          key={l + 100} 
          className="reason__reveal-dark border border-white/20 uppercase h-[1.5em] w-[1.5em] text-center font-main-light text-[1.6rem] bg-dark text-third relative opacity-0 transition-all duration-[2000ms] ease-in-out translate-x-[1000px] md-custom:text-[2rem] xl-custom:h-[1.3em] xl-custom:w-[1.3em] xl-custom:text-[3.8rem]"
        >
          {arrOfLettersDark[l]}
        </div>
      );
    }
    return arrOfDiv;
  };

  // ========================== ANIMATION ==========================

  useEffect(() => {
    const reasonReveal = () => {
      const revealsBright = document.querySelectorAll(".reason__reveal-bright");
      const revealsDark = document.querySelectorAll(".reason__reveal-dark");
      const elementVisible = 250;
      let windowHeight = window.innerHeight;

      const activeClasses = ["!translate-x-0", "!opacity-100"];

      revealsBright.forEach((el) => {
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add(...activeClasses);
        } else {
          el.classList.remove(...activeClasses);
        }
      });

      revealsDark.forEach((el) => {
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add(...activeClasses);
        } else {
          el.classList.remove(...activeClasses);
        }
      });
    };

    window.addEventListener("scroll", reasonReveal);
    reasonReveal(); // Initial check

    return () => {
      window.removeEventListener("scroll", reasonReveal);
    };
  }, []);

  const gridRef = useRef(null);

  return (
    <section className="section flex flex-col max-w-[94em] mx-auto" id="reason">
      <div className="flex flex-wrap gap-[0.3em] justify-center mt-[30em] mb-[10em]" ref={gridRef}>
        {createGrid()}
      </div>
      <WhyCard
        titleOne={whyData.reason.titleOne}
        textOne={whyData.reason.textOne}
        titleTwo={whyData.reason.titleTwo}
        textTwo={whyData.reason.textTwo}
        titleThree={whyData.reason.titleThree}
        textThree={whyData.reason.textThree}
        titleFour={whyData.reason.titleFour}
        textFour={whyData.reason.textFour}
        observation={whyData.reason.observation}
        bottom={whyData.reason.bottom}
        left={whyData.reason.left}
      />
    </section>
  );
};

export default Reason;
