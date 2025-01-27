"use client";

import React from 'react';

const Team: React.FC = () => {
  return (
    <div className="team section-stories" id="team">
      <div className="bg-video-2">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="/video/video1.mp4" type="video/mp4" />
          <source src="/img/video.webm" type="video/webm" />
          Your browser is not supported!
        </video>
      </div>
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary" style={{ color: 'white',fontFamily:"poppins" }}>For Enquiry</h2>
      </div>
      <div className="main-section">
        <div className="box">
          <h2 className="position">President</h2>
          <h3 className="heading-tertiary u-margin-bottom-small">Bharath V</h3>
          <p>+91 97515 83361</p>
        </div>
       
        <div className="box">
          <h2 className="position">Secretary</h2>
          <h3 className="heading-tertiary u-margin-bottom-small">Suhashini R</h3>
          <p>+91 93425 72196 </p>
        </div>
        
      </div>
      <div>
      <a
                href="https://drive.google.com/file/d/1dMm0oCW53daJt7EmHRQF6yqpZOane29A/view?usp=sharing"
                className="btn btn--white btn--animated bold"
                target="_blank"
                style={{position:"absolute",top:"87%" ,left:"50%",transform:"translate(-50%,-50%)"}}
                rel="noopener noreferrer"
              >
                CIT Bus Routes ↗
              </a>
      </div>
    </div>
  );
};

export default Team;
