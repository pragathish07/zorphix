"use client";


import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Main from './components/main/main';
import Loader from "./components/loader/loader";
import Counter from "./components/main/counter";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/firebaseConfig";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {

  const [user]=useAuthState(auth);
 

  const { scrollYProgress } = useScroll();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const checkboxRef = useRef<HTMLInputElement | null>(null);


  const toggleCheckbox = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  };

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fakeDataFetch();
  }, []);




  return  isLoading ? (
      <Loader />
    ) : (
      <div id="home" className="home">
       
        <div id="blur">
          <div className="navigation">
            <input
              type="checkbox"
              className="navigation__checkbox"
              id="navi-toggle"
              ref={checkboxRef}
            />
  
            <label htmlFor="navi-toggle" className="navigation__button">
              <span className="navigation__icon">&nbsp;</span>
            </label>
  
            <div className="navigation__background"> &nbsp; </div>
  
            <nav className="navigation__nav">
              <ul className="navigation__list">
                <li className="navigation__item">
                  <div className="navigation__link" onClick={toggleCheckbox}>
                    <a href="#" className="navigation__link one">
                      Home
                    </a>
                  </div>
                </li>
                <li className="navigation__item">
                  <div className="navigation__link" onClick={toggleCheckbox}>
                    <a href="#about" className="navigation__link two">
                      About
                    </a>
                  </div>
                </li>
                <li className="navigation__item">
                  <div className="navigation__link" onClick={toggleCheckbox}>
                    <a href="#events" className="navigation__link three">
                      Events
                    </a>
                  </div>
                </li>
                <li className="navigation__item">
                  <div className="navigation__link" onClick={toggleCheckbox}>
                    <a href="#team" className="navigation__link four">
                      Team
                    </a>
                  </div>
                </li>
              {user ? (
                <li className="navigation__item">
                  <div className="navigation__link" onClick={toggleCheckbox}>
                    <a href="/profile" className="navigation__link five">
                      Profile
                    </a>
                  </div>
                </li>
              ) : (
                <li className="navigation__item">
                  <div className="navigation__link" onClick={toggleCheckbox}>
                    <a href="/auth/login" className="navigation__link five">
                      Login
                    </a>
                  </div>
                </li>
              )}
              </ul>
            </nav>
          </div>
  
          <div id="video-container">
            <div id="video-overlay"></div>
            <div className="bg-video">
              <video className="bg-video__content" autoPlay muted loop>
                <source src={"/video/zorphixbgnew.mp4"} type="video/mp4" />
                Your browser is not supported!
              </video>
            </div>
          </div>
            
          <div className="header" id="header">
            <div className="header__logo-box">
              <img className="citlogo" src={"/img/NEW-LOGO-CIT.png"} alt="clg-logo" />
            </div>
  
            <div className="header__text-box" >
              <div className="logos">
                <img
                  
                  className="heading-primary--sub zor"
                  src={"/img/zologo.png"}
                  alt="new-logo"
                />
                <img
                  className="heading-primary--main zorphix"
                  src={"/img/zo.png"}
                  alt="zorphix-logo"
                />
              </div>
              <h1 className="heading-primary--sub date">February 18th 2025</h1>
  
              <a
                
                className="btn btn--white btn--animated bold"
                href="#events"
                
              >
                Explore ↗
              </a>
              <br/><br/>
              <Counter/>
            </div>
          </div>
          
          <Main />
        </div>
        <motion.div
          className="progress-bar"
          style={{ scaleX: scrollYProgress }}
          initial={{ scaleX: 0 }}
        />
      </div>
       
    );
  };
  

export default App;
