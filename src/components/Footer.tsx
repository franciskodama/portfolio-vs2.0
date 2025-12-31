'use client';

import Image from 'next/image';
import { Link } from 'react-scroll';
import LogoFooter from '../assets/images/logo-fkodama-footer.svg';
import Linkedin from '../assets/images/ico-linkedin-white.svg';
import Insta from '../assets/images/ico-instagram-white.svg';
import Git from '../assets/images/ico-github-white.svg';
const Resume = '/assets/resume.pdf';

const Footer = () => {
  return (
    <section className='section flex justify-center items-center flex-row bg-[#282828] border-t border-white/20' id='footer'>
      <div className='grid grid-cols-1 grid-rows-[repeat(12,auto)] lg-custom:grid-cols-[2fr_1fr_1fr_1fr] lg-custom:grid-rows-[repeat(4,auto)] lg-custom:gap-x-16 w-[70%] max-w-[80em] mx-auto pb-16'>
        
        {/* ==================== TITLES ==================== */}
        <h2 className='font-main-semibold mt-20 mb-4 lg-custom:col-start-1 lg-custom:row-start-1'>
          ABOUT<span className='text-third'>ME</span>
        </h2>
        <h2 className='hidden lg-custom:block font-main-semibold lg-custom:mt-20 lg-custom:mb-4 lg-custom:col-start-2 lg-custom:row-start-1'>
          GET<span className='text-third'>BACK</span>
        </h2>
        <h2 className='font-main-semibold mt-20 mb-4 lg-custom:col-start-3 lg-custom:row-start-1'>
          GET<span className='text-third'>IN TOUCH</span>
        </h2>
        <h2 className='font-main-semibold mt-20 mb-4 lg-custom:col-start-4 lg-custom:row-start-1'>
          GET<span className='text-third'>CONNECTED</span>
        </h2>

        {/* ==================== CONTENT ==================== */}
        <p className='text-[0.9rem] lg-custom:col-start-1 lg-custom:row-start-2 lg-custom:max-w-[24ch]'>
          A Software Engineer with a great deal of experience in marketing, a
          natural leader, curious, and constantly provoked by new challenges.
        </p>

        <div className='hidden lg-custom:flex lg-custom:flex-col lg-custom:col-start-2 lg-custom:row-start-2'>
          {[
            { to: 'hero', text: 'this.portfolio' },
            { to: 'about', text: 'about me' },
            { to: 'whyme', text: 'why me' },
            { to: 'ai', text: 'a.i.' },
            { to: 'projects', text: 'projects' },
            { to: 'api', text: 'api', offset: -150 },
            { to: 'code', text: 'my code' },
            { to: 'contact', text: 'contact', offset: -150 }
          ].map((item) => (
            <Link
              key={item.to}
              className='text-[0.9rem] mb-2 cursor-pointer transition-all duration-200 ease-in hover:font-main-semibold hover:text-third hover:-translate-x-[3px]'
              to={item.to}
              spy={true}
              smooth={true}
              offset={item.offset || 0}
              duration={500}
            >
              {item.text}
            </Link>
          ))}
        </div>

        <div className='flex flex-col lg-custom:col-start-3 lg-custom:row-start-2'>
          <p className='text-[0.9rem] mb-2'>fk@fkodama.com</p>
          <Link
            className='text-[0.9rem] underline cursor-pointer transition-all duration-200 ease-in hover:font-main-semibold hover:text-third hover:-translate-x-[3px]'
            to='contact'
            spy={true}
            smooth={true}
            offset={200}
            duration={500}
          >
            send message
          </Link>
        </div>

        <div className='flex flex-wrap flex-row h-[70%] items-start mt-4 lg-custom:col-start-4 lg-custom:row-start-2 lg-custom:mt-0'>
          {[
            { href: 'https://github.com/franciskodama', src: Git, alt: 'logo Github' },
            { href: 'https://www.linkedin.com/in/kodama/', src: Linkedin, alt: 'logo Linkedin' },
            { href: 'https://www.instagram.com/franciskodama/', src: Insta, alt: 'logo Instagram' }
          ].map((icon, idx) => (
            <a
              key={idx}
              className='relative mr-4 group'
              href={icon.href}
              target='_blank'
              rel='noreferrer'
            >
              <div className='absolute inset-0 border-2 border-third rounded-full w-[33px] h-[33px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
              <Image className='w-[35px]' src={icon.src} alt={icon.alt} />
            </a>
          ))}
        </div>

        <Image className='hidden lg-custom:block lg-custom:col-start-1 lg-custom:row-start-3 lg-custom:w-[120px] lg-custom:opacity-40 mt-8' src={LogoFooter} alt='logo fkodama' />

        <div className='flex flex-col text-[0.8rem] mt-16 lg-custom:col-start-4 lg-custom:row-start-3 lg-custom:mt-0'>
          <p>Designed and built by</p>
          <p className='font-main-regular'>Francis Kodama</p>
          <p>Copyright 2023</p>
        </div>

        <div className='flex mt-12 items-end lg-custom:col-start-1 lg-custom:row-start-4 lg-custom:mt-0'>
          <h2 className='font-main-semibold mr-4 text-center leading-none'>RESUME</h2>
          <a
            className='block cursor-pointer text-white active:text-white visited:text-white hover:font-main-semibold hover:text-third hover:-translate-x-[3px]'
            href={Resume}
            target='_blank'
            rel='noreferrer'
          >
            <p className='text-[0.7rem]'>Download</p>
          </a>
          <p className='font-main-regular block text-[0.7rem] ml-4'>Resumé</p>
        </div>

        <p className='hidden lg-custom:block lg-custom:col-start-4 lg-custom:row-start-4 lg-custom:text-[0.7rem] lg-custom:text-left lg-custom:self-end lg-custom:mt-20'>
          Ottawa, ON - <span className='font-main-regular'>Canada</span>
        </p>
      </div>
    </section>
  );
};

export default Footer;
