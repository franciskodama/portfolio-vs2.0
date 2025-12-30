'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-scroll';

import '../app/globals.css';
import './Navbar.css'; // Import the new CSS file
import Logo from '../assets/logo-fkodama.svg';
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

  useEffect(() => {
    // console.log(isOpen, isActive);
  }, [isActive, isOpen]);

  return (
    <header className='navbar'>
      <div className='navbar-container'>
        <Link to='hero' spy={true} smooth={true} offset={0} duration={500}>
          <Image className='nav-logo' alt='logo fkodama' src={Logo} />
        </Link>

        {/* -------- NAVBAR TOGGLE -------- */}

        <div className='menu-toggle'>
          <Image
            className='menu-icon'
            style={{
              display: isOpen ? 'none' : 'block',
            }}
            onClick={hangleClickOpen}
            src={Menu}
            alt='hamburguer icon menu'
          />
          <Image
            className='menu-icon'
            style={{
              display: isOpen ? 'block' : 'none',
            }}
            onClick={handleClickClose}
            src={Close}
            alt='close icon menu'
          />
        </div>

        {/* -------- NAVBAR EXTENDED -------- */}

        <nav
          className='nav-menu-mobile'
          style={{ display: isActive ? 'block' : 'none' }}
        >
          {/* <Link
            className='nav-link-mobile'
            to='hero'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            {' '}
            home{' '}
          </Link> */}
          <Link
            className='nav-link-mobile'
            to='reason'
            spy={true}
            smooth={true}
            offset={-50}
            duration={2000}
            onClick={handleClickOnLink}
          >
            this.portfolio
          </Link>
          <Link
            className='nav-link-mobile'
            to='about'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            about.me
          </Link>
          <Link
            className='nav-link-mobile'
            to='whyme'
            spy={true}
            smooth={true}
            offset={100}
            duration={500}
            onClick={handleClickOnLink}
          >
            why.me
          </Link>
          <Link
            className='nav-link-mobile'
            to='ai'
            spy={true}
            smooth={true}
            offset={100}
            duration={500}
            onClick={handleClickOnLink}
          >
            a.i.
          </Link>
          <Link
            className='nav-link-mobile'
            to='projects'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            projects
          </Link>

          <Link
            className='nav-link-mobile'
            to='api'
            spy={true}
            smooth={true}
            offset={-150}
            duration={500}
            onClick={handleClickOnLink}
          >
            api
          </Link>

          <Link
            className='nav-link-mobile'
            to='code'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            my.code
          </Link>
          <Link
            className='nav-link-mobile'
            to='contact'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            contact
          </Link>
        </nav>

        {/* -------- NAVBAR HORIZONTAL -------- */}

        <nav className='nav-menu-desktop'>
          {/* <Link
            className='nav-link-desktop'
            to='hero'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            {' '}
            home{' '}
          </Link> */}
          <Link
             className='nav-link-desktop'
            to='reason'
            spy={true}
            smooth={true}
            offset={-50}
            duration={2000}
            onClick={handleClickOnLink}
          >
            this.portfolio
          </Link>
          <Link
             className='nav-link-desktop'
            to='about'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            about.me
          </Link>
          <Link
             className='nav-link-desktop'
            to='whyme'
            spy={true}
            smooth={true}
            offset={100}
            duration={500}
            onClick={handleClickOnLink}
          >
            why.me
          </Link>
          <Link
             className='nav-link-desktop'
            to='ai'
            spy={true}
            smooth={true}
            offset={100}
            duration={500}
            onClick={handleClickOnLink}
          >
            {' '}
            a.i.{' '}
          </Link>
          <Link
             className='nav-link-desktop'
            to='projects'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            {' '}
            projects{' '}
          </Link>

          <Link
             className='nav-link-desktop'
            to='api'
            spy={true}
            smooth={true}
            offset={-150}
            duration={500}
            onClick={handleClickOnLink}
          >
            api
          </Link>
          <Link
             className='nav-link-desktop'
            to='code'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            my.code
          </Link>
          <Link
             className='nav-link-desktop'
            to='contact'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            onClick={handleClickOnLink}
          >
            contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

