'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import Image from 'next/image';

import Logo from '../assets/images/fk-white-transparent-bg.png';
import Menu from '../assets/images/menu-hamburguer.svg';
import Close from '../assets/images/card-icon-close-white.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClickClose = () => {
    setIsOpen(!isOpen);
    setIsActive(false);
  };

  const hangleClickOpen = () => {
    setIsOpen(!isOpen);
    setIsActive(true);
  };

  const handleClickOnLink = () => {
    setIsActive(false);
    setIsOpen(false);
  };

  useEffect(() => {}, [isActive, isOpen]);

  return (
    <header className='fixed w-full top-0 z-100 bg-dark overflow-visible'>
      <div className='container mx-auto w-full px-4 lg-custom:px-0 lg-custom:w-[90%] flex justify-between items-center'>
        <Link to='hero' spy={true} smooth={true} offset={0} duration={500}>
          <div className='py-4 cursor-pointer'>
            <Image
              className='w-[100px] transform transition-transform duration-300 hover:scale-105'
              alt='logo fkodama'
              src={Logo}
            />
          </div>
        </Link>

        <div className='relative flex flex-col justify-center z-99 cursor-pointer lg-custom:hidden'>
          <Image
            className='w-[30px] transform transition-transform duration-300 hover:scale-105'
            style={{
              display: isOpen ? 'none' : 'block',
            }}
            onClick={hangleClickOpen}
            src={Menu}
            alt='hamburguer icon menu'
          />
          <Image
            className='w-[30px] transform transition-transform duration-300 hover:scale-105'
            style={{
              display: isOpen ? 'block' : 'none',
            }}
            onClick={handleClickClose}
            src={Close}
            alt='close icon menu'
          />
        </div>

        <nav
          className='absolute top-full left-0 w-full h-screen bg-third flex flex-col items-center justify-start pt-20 lg-custom:hidden transition-all duration-300'
          style={{ display: isActive ? 'flex' : 'none' }}
        >
          {[
            { to: 'reason', label: 'this.portfolio', offset: -50 },
            { to: 'about', label: 'about.me', offset: 0 },
            { to: 'whyme', label: 'why.me', offset: 100 },
            { to: 'ai', label: 'a.i.', offset: 100 },
            { to: 'projects', label: 'projects', offset: 0 },
            { to: 'code', label: 'my.code', offset: 0 },
            { to: 'contact', label: 'contact', offset: 0 },
          ].map((link) => (
            <Link
              key={link.to}
              className='relative font-main-regular text-bright text-[1.4rem] no-underline cursor-pointer block transform-gpu transition-all duration-300 mb-8 hover:scale-110'
              to={link.to}
              spy={true}
              smooth={true}
              offset={link.offset}
              duration={link.to === 'reason' ? 2000 : 500}
              onClick={handleClickOnLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* -------- NAVBAR HORIZONTAL -------- */}

        <nav className='hidden lg-custom:grid grid-cols-[8rem_6.6rem_5.5rem_3.3rem_5.8rem_6rem_4.3rem] items-center justify-end'>
          {[
            { to: 'reason', label: 'this.portfolio', offset: -50 },
            { to: 'about', label: 'about.me', offset: 0 },
            { to: 'whyme', label: 'why.me', offset: 100 },
            { to: 'ai', label: 'a.i.', offset: 100 },
            { to: 'projects', label: 'projects', offset: 0 },
            { to: 'code', label: 'my.code', offset: 0 },
            { to: 'contact', label: 'contact', offset: 0 },
          ].map((link) => (
            <Link
              key={link.to}
              className='block relative text-bright font-main-light text-[1rem] no-underline cursor-pointer transition-all duration-300  hover:scale-105 hover:first-letter:text-third'
              to={link.to}
              spy={true}
              smooth={true}
              offset={link.offset}
              duration={link.to === 'reason' ? 2000 : 500}
              onClick={handleClickOnLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
