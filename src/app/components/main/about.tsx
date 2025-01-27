import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const About: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div id="about" className="section-about" data-aos="fade-down">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary white letter-spacing">About Us</h2>
      </div>

      <div className="row">
        <div className="col-1-of-2">
          <p className="paragraph">
            <b>Computer Science & Business Systems</b> is the first stream in engineering designed to meet the future
            demands of the rapidly changing tech industry in the era of Business 4.0. Designed by Tata Consultancy Services in an MoU
            with educational institutions, CSBS is the degree program of the future. The curriculum aims to ensure that the students
            graduating from the program not only skill up in computer science but also develop an equal appreciation of humanities and
            management sciences.
          </p>
        </div>
        <div className="col-1-of-2">
          <div className="composition">
          <img
              srcSet={`${"/img/about1.jpg"} 300w, ${"/img/about1.jpg"} 1000w`}
              sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
              alt="Pic1"
              className="composition__photo composition__photo--p1"
              src={"/img/about1.jpg"}
            />

            <img
              srcSet={`${"/img/about2.jpg"} 300w, ${"/img/about2.jpg"} 1000w`}
              sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
              alt="Photo2"
              className="composition__photo composition__photo--p2"
              src={"/img/about2.jpg"}
            />

            <img
              srcSet={`${"/img/about3.jpg"} 300w, ${"/img/about3.jpg"} 1000w`}
              sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
              alt="Pic33"
              className="composition__photo composition__photo--p3"
              src={"/img/about3.jpg"}
            />
            
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default About;
