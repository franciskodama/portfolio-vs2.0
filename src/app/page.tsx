'use client';

import React, { useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Palette from '../components/Palette';
import Reason from '../components/Reason';
import { AboutContext } from '../contexts/AboutContext';
import About from '../components/About';
import WhyMe from '../components/WhyMe';
import Ai from '../components/Ai';
import Projects from '../components/Projects';
import AboveApi from '../components/AboveApi';
import Api from '../components/Api';
import CleanCode from '../components/CleanCode';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [location, setLocation] = useState({ data: '' });
  const [isActive, setIsActive] = useState({
    first: true,
    second: false,
    third: false,
  });

  const firstColors = () => {
    const root = document.querySelector(':root') as HTMLElement;
    if (root) {
      root.style.setProperty('--dark-color', '#1c1c1c');
      root.style.setProperty('--bright-color', '#ffffff');
      root.style.setProperty('--third-color', '#ed1c24');
    }
    setIsActive({
      first: true,
      second: false,
      third: false,
    });
  };

  const secondColors = () => {
    const root = document.querySelector(':root') as HTMLElement;
    if (root) {
      root.style.setProperty('--dark-color', '#29335C');
      root.style.setProperty('--bright-color', '#669BBC');
      root.style.setProperty('--third-color', '#F3A712');
    }
    setIsActive({
      first: false,
      second: true,
      third: false,
    });
  };

  const thirdColors = () => {
    const root = document.querySelector(':root') as HTMLElement;
    if (root) {
      root.style.setProperty('--dark-color', '#757575');
      root.style.setProperty('--bright-color', '#ffffff');
      root.style.setProperty('--third-color', '#03A9F4');
    }
    setIsActive({
      first: false,
      second: false,
      third: true,
    });
  };

  const color = isActive;

  return (
    <main className="App">
      <ParallaxProvider>
        <Navbar />
        <Hero />
        <Palette
          firstColors={firstColors}
          secondColors={secondColors}
          thirdColors={thirdColors}
          isActive={isActive}
        />
        <Reason />
        <AboutContext.Provider value={{ location, setLocation }}>
          <About />
          <WhyMe />
          <Ai color={color} />
          <Projects />
          <AboveApi />
          <Api />
          <CleanCode />
          <Contact />
        </AboutContext.Provider>
        <Footer />
      </ParallaxProvider>
    </main>
  );
}
