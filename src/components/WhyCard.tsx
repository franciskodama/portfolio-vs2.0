'use client';
import React, { useRef, useState } from "react";
import Image from "next/image";
import EyeOpen from "../assets/images/why-eye-open.svg";
import EyeClosed from "../assets/images/why-eye-closed.svg";
import Check from "../assets/images/why-icon-check.svg";
import Close from "../assets/images/card-icon-close-white.svg";

const WhyCard = ({
  titleOne,
  textOne,
  titleTwo,
  textTwo,
  titleThree,
  textThree,
  titleFour,
  textFour,
  observation,
  bottom,
  left,
}: {
  titleOne: string;
  textOne: string;
  titleTwo: string;
  textTwo: string;
  titleThree: string;
  textThree: string;
  titleFour: string;
  textFour: string;
  observation: string;
  bottom: string;
  left: string;
}) => {
  const [isCardShow, setIsCardShow] = useState(false);
  const [isOnMouse, setisOnMouse] = useState(false);

  const refButton = useRef(null);
  const refButtonLabel = useRef(null);
  const refWhy = useRef(null);

  const onMouseEnterHandler = () => {
    setisOnMouse(true);
  };

  const onMouseOutHandler = () => {
    setisOnMouse(false);
  };

  const clickHandler = () => {
    isCardShow ? setIsCardShow(false) : setIsCardShow(true);
  };

  return (
    <div className="absolute flex w-max items-end -translate-x-1/2 text-bright z-10" style={{ bottom: bottom, left: left }}>
      <button
        ref={refButton}
        className={`relative flex flex-col w-10 h-10 bg-dark items-center justify-center border-0 transition-all duration-300 ease-in-out translate-x-0 translate-y-0 cursor-pointer ${
          isCardShow ? "bg-third [box-shadow:-1px_1px_var(--color-bright),-2px_2px_var(--color-bright),-3px_3px_var(--color-bright)] translate-x-[3px] translate-y-[3px]" : ""
        }`}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseOutHandler}
        onClick={clickHandler}
      >
        <span
          className={`absolute top-[-2em] left-[-6px] text-bright font-main-regular text-[0.65rem] w-[50px] h-[50px] text-center uppercase leading-[0.7rem] animate-icon-shake ${
            isOnMouse && !isCardShow ? "block" : "hidden"
          }`}
          ref={refButtonLabel}
        >
          Click me
        </span>

        <Image
          className="w-[30px]"
          src={isCardShow ? EyeClosed : EyeOpen}
          alt="icon eye"
        />
      </button>

      <ul
        className={`absolute flex-col px-[1.8em] bg-third w-[21em] bottom-[3em] left-[calc(-10.5em+20px)] animate-card-open md-custom:w-max md-custom:px-8 md-custom:left-[-10.5em] lg-custom:translate-x-0 lg-custom:bottom-0 lg-custom:left-[2.9em] ${
          isCardShow ? "flex" : "hidden"
        }`}
        ref={refWhy}
      >
        <Image
          className="absolute top-0 right-0 p-2 cursor-pointer"
          onClick={clickHandler}
          src={Close}
          alt="close button icon"
        />

        <li
          className="flex flex-col w-auto md-custom:w-[30ch]"
          style={{ margin: titleOne ? "2.5em 0 2em 0" : "0" }}
        >
          <h2
            className="font-main-semibold text-[1.1rem] bg-[0_0] bg-no-repeat bg-[length:1.5em] pl-10 pb-2 bg-[url('../assets/images/why-icon-flag.svg')]"
            style={{ display: titleOne ? "block" : "none" }}
          >
            {titleOne}
          </h2>
          <p className="font-main-light">{textOne}</p>
        </li>

        <li
          className="flex flex-col w-auto md-custom:w-[30ch]"
          style={{ marginBottom: titleTwo ? "2em" : "0" }}
        >
          <h2
            className="font-main-semibold text-[1.1rem] bg-[0_0] bg-no-repeat bg-[length:1.5em] pl-10 pb-2 bg-[url('../assets/images/why-icon-bolt.svg')]"
            style={{ display: titleTwo ? "block" : "none" }}
          >
            {titleTwo}
          </h2>
          <p className="font-main-light">{textTwo}</p>
        </li>

        <li
          className="flex flex-col w-auto md-custom:w-[30ch]"
          style={{ marginBottom: titleThree ? "2em" : "0" }}
        >
          <h2
            className="font-main-semibold text-[1.1rem] bg-[0_0] bg-no-repeat bg-[length:1.5em] pl-10 pb-2 bg-[url('../assets/images/why-icon-robot.svg')]"
            style={{ display: titleThree ? "block" : "none" }}
          >
            {titleThree}
          </h2>
          <p className="font-main-light">{textThree}</p>
        </li>

        <li
          className="flex flex-col w-auto md-custom:w-[30ch]"
          style={{ marginBottom: titleFour ? "2em" : "0" }}
        >
          <h2
            className="font-main-semibold text-[1.1rem] bg-[0_0] bg-no-repeat bg-[length:1.5em] pl-10 pb-2 bg-[url('../assets/images/why-icon-brush.svg')]"
            style={{ display: titleFour ? "block" : "none" }}
          >
            {titleFour}
          </h2>
          <p className="font-main-light">{textFour}</p>
        </li>

        <li
          className={`items-center bg-bright text-third uppercase font-main-regular text-[0.7rem] mt-12 mb-12 ${
            observation ? "flex" : "hidden"
          }`}
        >
          <Image className="mx-4" src={Check} alt="icon check" />
          <p className="w-[32ch] py-2">{observation}</p>
        </li>
      </ul>
    </div>
  );
};

export default WhyCard;
