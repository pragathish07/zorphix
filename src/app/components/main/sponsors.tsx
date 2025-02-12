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
            <h2 className="sponsor_label">Title Sponsor</h2>
            <img src={"/img/mcafe.png"} className="mcafe" alt="mcafe" />
          </div>
          <div className="section-sponsor-card" data-aos="fade-right">
            <h2 className="sponsor_label">Associate Sponsor</h2>
            <img src={"/img/ovi.png"} className="i ovid" alt="Ovi_Design" />
          </div>
          <div className="section-sponsor-card" data-aos="fade-right">
            <h2 className="sponsor_label">Printing Partner</h2>
            <img src={"/img/poorvika.png"} className="i por" alt="Poorvika" />
          </div>
          
         
      </div>
    </div>
  );
};

export default Sponsors;
