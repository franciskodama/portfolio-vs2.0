'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { avatarData } from "../data/Data";
import LightBulb from "../assets/images/about-lightbulb.svg";
import Puzzle from "../assets/images/about-puzzle.svg";
import Chat from "../assets/images/about-chat.svg";
import Student from "../assets/images/about-student.svg";
import Eye from "../assets/images/about-eye.svg";
import Smile from "../assets/images/about-smile.svg";

const Avatar = () => {
  const [isImgShown, setIsImgShown] = useState(0);
  const [imgActive, setImgActive] = useState(false);

  useEffect(() => {
    setImgActive(true);
  }, [isImgShown]);

  const softSkills = [
    { icon: LightBulb, alt: "creative", id: 1 },
    { icon: Puzzle, alt: "problem solving", id: 2 },
    { icon: Chat, alt: "passionate for technology", id: 3 },
    { icon: Student, alt: "constant learning", id: 4 },
    { icon: Eye, alt: "detail oriented", id: 5 },
    { icon: Smile, alt: "friendly", id: 6 },
  ];

  return (
    <div className="mx-auto w-full">
      <div className="grid grid-cols-[1em_auto_auto_1em] grid-rows-[repeat(6,auto)] w-full md-custom:grid-cols-[1fr_62px_1em_412px_1fr] md-custom:grid-rows-[5em_auto_auto_2em_8em_5em] lg-custom:grid-cols-[2fr_62px_1em_412px_1fr]">
        
        <p className="col-start-2 row-start-1 text-[0.7rem] font-main-light mt-20 mb-2 text-left md-custom:row-start-2 md-custom:mt-0">
          soft skills:
        </p>

        <div className="col-start-2 row-start-2 flex flex-row gap-2 text-center md-custom:row-start-3 md-custom:flex-col md-custom:w-[62px]">
          {softSkills.map((skill) => (
            <Image
              key={skill.id}
              onClick={() => {
                setIsImgShown(skill.id);
                setImgActive(false);
              }}
              className="border border-dashed border-dark p-2 w-[3.25em] cursor-pointer md-custom:w-16"
              src={skill.icon}
              alt={skill.alt}
            />
          ))}
        </div>

        <Image
          className={`col-start-2 row-start-3 mt-4 w-[22em] z-[5] md-custom:col-start-4 md-custom:row-start-3 md-custom:mt-0 md-custom:w-[25.75em] ${
            imgActive ? "animate-image-change" : ""
          }`}
          src={avatarData[isImgShown].imgUrl}
          alt="my avatar images"
        />

        <div
          className={`col-start-2 row-start-5 md-custom:col-start-4 md-custom:row-start-5 ${
            imgActive ? "animate-image-change" : ""
          }`}
        >
          <h3 className="mb-2 font-main-semibold text-[1.3rem] uppercase mt-4 md-custom:col-start-4 md-custom:row-start-2 md-custom:mt-0">
            {avatarData[isImgShown].title}
          </h3>
          <p className="text-[0.8rem] mb-20 md-custom:mb-0">
            {avatarData[isImgShown].description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Avatar;
