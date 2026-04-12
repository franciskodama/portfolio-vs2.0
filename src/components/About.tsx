'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-scroll';
import gsap from 'gsap';

import { AboutContext } from '../contexts/AboutContext';
import Button from '../components/ui/Button';
import BagEmpty from '../assets/images/bag.svg';
import AboutMe from '../components/AboutMe';
import Thumbnail from '../assets/images/avatar-300x300.jpg';
import Trash from '../assets/images/about-trash.svg';
import Close from '../assets/images/card-icon-close-white.svg';

const About = () => {
  const { location, setLocation } = useContext(AboutContext);

  const [showMessageError, setShowMessageError] = useState(false);
  const [addMe, setAddMe] = useState({ showMe: false });
  const [showMessage, setShowMessage] = useState({ show: false });
  const [inBag, setInBag] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMessage.show) {
      gsap.from(modalRef.current, {
        opacity: 0,
        duration: 0.5,
        scale: 0.9,
      });
    }
  }, [showMessage.show]);

  const handleClickLocation = (e: any) => {
    const newLocation = { data: e.target.value };
    setLocation(newLocation);
    const error = false;
    setShowMessageError(error);
  };

  const handleClickAddToTeam = () => {
    if (location.data) {
      setShowMessage({ show: false });
      setAddMe({ showMe: true });
      setInBag(true);
    } else {
      const error = true;
      setShowMessageError(error);
    }
  };

  const handleClickBag = () => {
    setShowMessage(showMessage.show ? { show: false } : { show: true });
  };

  const handleClickDelete = () => {
    setAddMe({ showMe: false });
    setInBag(false);
  };

  const handleClickClose = () => {
    setShowMessage({ show: false });
  };

  const handleClickInterview = () => {
    setShowMessage({ show: false });
  };

  useEffect(() => {
    const revealAbout = () => {
      const reveals = document.querySelectorAll(
        '.about__container-reveal-trigger'
      );

      reveals.forEach((el) => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('translate-x-[5000px]', 'opacity-0');
        } else {
          el.classList.remove('translate-x-[5000px]', 'opacity-0');
        }
      });
    };

    window.addEventListener('scroll', revealAbout);
    revealAbout();

    return () => {
      window.removeEventListener('scroll', revealAbout);
    };
  }, []);

  return (
    <section
      className='section bg-dark lg-custom:px-20 lg-custom:pt-20 lg-custom:pb-8'
      id='about'
    >
      <div className='container max-w-[85em] mx-auto relative flex flex-col bg-bright text-dark mt-20 mb-24 lg-custom:flex-row lg-custom:mb-12'>
        <div className='about__container-reveal-trigger absolute top-0 left-0 w-full h-full bg-dark z-10 translate-x-0 opacity-100 transition-all duration-2000 ease-in-out'></div>
        <div className='relative w-full bg-[#eaeaea] lg-custom:w-1/2'>
          <AboutMe />
        </div>

        <div className='relative flex flex-col w-full justify-center max-w-[36em] px-4 overflow-hidden mb-12 md-custom:pl-[10em] md-custom:max-w-[41em] md-custom:items-start lg-custom:pl-16 lg-custom:mb-0 lg-custom:w-1/2 lg-custom:max-w-[36em]'>
          <div className='absolute top-12 left-[-5.2em] font-main-light text-[0.8rem] w-[20em] leading-[1.2em] p-2 text-bright bg-third -rotate-45 text-center'>
            <p className='font-main-semibold'>NOW WITH </p>
            <p className='font-main-semibold'>BUILT-IN ARCHITECTURE</p>
          </div>

          <div
            onClick={handleClickBag}
            className='relative self-end cursor-pointer mr-2 mt-12 hover:animate-icon-shake focus:animate-icon-shake active:animate-icon-shake'
            id='bag'
          >
            <Image src={BagEmpty} alt='Shop bag empty' />
            <p
              className='absolute top-[1.2em] left-[-0.5em] px-[0.4rem] z-2 text-[0.7rem] font-main-semibold text-bright bg-third rounded-full text-center animate-number-one'
              style={{ display: addMe.showMe ? 'block' : 'none' }}
            >
              1
            </p>
          </div>

          {/* ======================= MODAL ========================= */}

          <div
            className='absolute right-[65px] top-[33px] text-bright bg-dark p-4 h-[19em] w-[18em] animate-modal-open z-20 before:content-[""] before:absolute before:w-0 before:height-0 before:border-t-12 before:border-t-transparent before:border-l-12 before:border-l-dark before:border-r-12 before:border-r-transparent before:border-b-12 before:border-b-transparent before:top-5 before:right-[-24px] md-custom:right-[50px] md-custom:p-8 md-custom:w-[23.5em] lg-custom:top-[94px]'
            ref={modalRef}
            style={{ display: showMessage.show ? 'block' : 'none' }}
          >
            <div className='flex justify-between items-center'>
              <h3 className='font-main-semibold'>CHECKOUT</h3>
              <Image
                className='w-[1.5em] mr-2 cursor-pointer'
                onClick={handleClickClose}
                src={Close}
                alt='close button'
              />
            </div>

            {/* ==================== MODAL FULL ====================== */}

            <div className={`${inBag ? 'block' : 'hidden'}`}>
              <div className='flex mb-10'>
                <Image
                  className='w-[70px] h-[70px] m-4'
                  src={Thumbnail}
                  alt='thumbanail avatar'
                />
                <div className='flex flex-col justify-center'>
                  <h4 className='font-main-regular leading-[1.2rem]'>
                    Francis Kodama
                  </h4>
                  <p className='hidden text-[0.8rem] pb-2 border-b-[0.5px] border-dashed border-bright md-custom:block'>
                    fk@fkodama.com
                  </p>
                  <div className='modal__location-wrapper'>
                    <p className='text-[0.8rem]'>
                      Location:{' '}
                      <span className='uppercase font-main-semibold'>
                        {location.data}
                      </span>
                    </p>
                  </div>
                </div>
                <Image
                  onClick={handleClickDelete}
                  className='px-5 py-0 pl-10 cursor-pointer hover:animate-icon-shake focus:animate-icon-shake active:animate-icon-shake'
                  src={Trash}
                  alt='icon trash to delete'
                />
              </div>
              <p className='text-[0.8rem] mb-2'>Confirm Purchase:</p>
              <Link
                to='contact'
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
              >
                <Button
                  className='btn btn--bright'
                  onClick={handleClickInterview}
                  text='schedule an interview'
                />
              </Link>
            </div>

            {/* ==================== MODAL EMPTY ====================== */}

            <div
              className={`${
                !inBag ? 'flex' : 'hidden'
              } flex-col bg-[url(../assets/images/about-empty.svg)] bg-no-repeat bg-size-[6em] bg-position-[1em_1.5em] md-custom:bg-position-[2em_1.5em]`}
            >
              <div className='mt-8 ml-32 mb-10 relative after:content-[""] after:absolute after:bottom-[-1em] after:left-[-9em] after:w-[19.2em] after:border-b-[0.5px] after:border-dashed after:border-bright md-custom:ml-[9em]'>
                <p className='font-main-light text-[1.2rem]'>Your bag is</p>
                <h3 className='text-third font-main-semibold text-[1.85rem]'>
                  EMPTY
                </h3>
              </div>

              <p className='text-[0.8rem] mb-2'>Would you like to return?</p>
              <Button
                className='btn btn--bright'
                onClick={handleClickClose}
                text='Continue Shopping'
              />
            </div>
          </div>

          <div className='w-full ml-4 md:ml-12'>
            <h3 className='mt-20 text-[1.2rem] font-main-light mb-0 lg-custom:mt-0 lg-custom:mb-[0.8em]'>
              Francis Kodama
            </h3>
            <h2 className='text-[1rem] md:text-[1.4rem] font-main-semibold uppercase'>
              Technical Product Lead
            </h2>
            <h2 className='text-[1rem] md:text-[1rem] font-main-semibold uppercase lg-custom:mb-[0.8em]'>
              Ex-Agency Director (100+ Staff)
            </h2>
            <div className='font-main-light'>
              <p className='text-[0.95rem] my-4 mr-4 max-w-[30ch] md-custom:max-w-[42ch]'>
                Some leaders learn to code. Some engineers learn to lead. I did
                both, but leadership was always the foundation. With 20+ years
                directing enterprise teams and Fortune 500 programs, I bring the
                rare ability to inspire people, make hard calls, and ship real
                product.
              </p>
              <p className='text-[0.95rem] max-w-[30ch] md-custom:max-w-[42ch] mb-8'>
                The full-stack engineering is the upgrade. The leadership is the
                engine.
              </p>
            </div>
          </div>

          <div className='flex items-end justify-between ml-4 md:ml-12'>
            <div className='flex flex-col relative'>
              <p className='text-[0.7rem] font-main-light mt-8 mb-2'>
                Location:
              </p>
              <form className='flex flex-wrap items-center mb-12 gap-y-2'>
                <div className='flex items-center'>
                  <input
                    onClick={handleClickLocation}
                    className='h-[0.8rem] cursor-pointer'
                    type='radio'
                    name='location'
                    value='remote'
                    id='remote'
                  />
                  <label
                    className='font-main-semibold text-[0.8rem] mx-2 mr-6'
                    htmlFor='remote'
                  >
                    Remote
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    onClick={handleClickLocation}
                    className='h-[0.8rem] cursor-pointer'
                    type='radio'
                    name='location'
                    value='ottawa'
                    id='ottawa'
                  />
                  <label
                    className='font-main-semibold text-[0.8rem] mx-2 mr-6'
                    htmlFor='ottawa'
                  >
                    Ottawa
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    onClick={handleClickLocation}
                    className='h-[0.8rem] cursor-pointer'
                    type='radio'
                    name='location'
                    value='hybrid'
                    id='hybrid'
                  />
                  <label
                    className='font-main-semibold text-[0.8rem] mx-2 mr-6'
                    htmlFor='hybrid'
                  >
                    Hybrid
                  </label>
                </div>
              </form>

              <Button
                className='btn btn--dark mb-20 lg-custom:mb-0'
                onClick={handleClickAddToTeam}
                text='add to my team'
                align='flex-start'
              />

              <p
                className={`absolute bottom-[-2.6em] font-main-regular text-[0.8rem] text-bright bg-third px-[2em] py-2 text-center animate-appear z-0 ${
                  showMessageError ? 'block' : 'hidden'
                }`}
              >
                ...Ops, choose a location
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
