"use client";

import React, { useEffect } from "react";
import { Inter } from 'next/font/google'

import Aos from "aos";
import 'aos/dist/aos.css';
import Image from "next/image";

const Sponsors: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="section-features" data-aos="fade-down">
      <div className="u-center-text">
        <h2 className="heading-secondary white letter-spacing">Sponsored By</h2>
      </div>
      <div className="sponsor">
        
        
          
      <div className="section-sponsor-card" data-aos="fade-right">
            <img src={"/img/mcafe.png"} className="i mcafe" alt="mcafe" />
          </div>
         {/*  <div className="section-sponsor-card" data-aos="fade-right">
            <img src={"/img/DIDO.png"} className="i ovi" alt="dido" />
          </div> */}
          
         
      </div>
    </div>
  );
};

export default Sponsors;
