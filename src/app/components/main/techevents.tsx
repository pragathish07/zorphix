"use client";

import React, { useEffect, useState } from "react";
import PopupModal from "./popupmodal";
import Aos from "aos";
import 'aos/dist/aos.css';

const TechEvents = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    heading: "",
    content: "",
    org1Name: "",
    org2Name: "",
    org1Phone: "",
    org2Phone: "",
    registrationLink: "",
    venue: "",
  });

  const toggle = (
    title : string,
    content : string,
    org1Name : string,
    org2Name : string,
    org1Phone : string,
    org2Phone : string,
    registrationLink : string,
    venue : string
  ) => {
    setEventInfo({
      heading: title,
      content,
      org1Name,
      org2Name,
      org1Phone,
      org2Phone,
      registrationLink,
      venue,
    });
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="section-tours" id="events">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary white letter-spacing">
          Events
        </h2>
      </div>

      <div className="row">
        <div className="col-1-of-3">
          <div className="card" data-aos="zoom-in">
            <div className="card__side card__side--front">
              <div className="card__picture card__picture--1-tech">&nbsp;</div>
              <h4 className="card__heading">
                <span className="card__heading-span card__heading-span--1 bold-white">
                  xCoders
                </span>
              </h4>
              <div className="card__details">
                <p>
                  CrossCoders is an electrifying coding competition where
                  participants go beyond traditional coding. Contestants are
                  expected to analyze code snippets and convert them into a
                  language of their choice.
                </p>
              </div>
            </div>
            <div className="card__side card__side--back card__side--back-1">
              <div className="card__cta">
                <div className="card__price-box">
                  <p
                    className="btn btn--white"
                    onClick={() =>
                      toggle(
                        "xCoders",
                        "CrossCoders is an electrifying coding competition where participants go beyond traditional coding. Contestants are expected to analyze code snippets and convert them into a language of their choice.",
                        "Bhanupriya M",
                        "Jawahar Ganesh D",
                        "+91 96770 55652",
                        "+91 93603 90526",
                        "forms.gle/RqExTs9gLNsFEPCHA",
                        "Security Lab - First Floor"
                      )
                    }
                  >
                    Know More
                  </p>
                </div>
                <a className="btn btn--white">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-1-of-3">
          <div className="card" data-aos="zoom-in">
            <div className="card__side card__side--front">
              <div className="card__picture card__picture--2-tech">&nbsp;</div>
              <h4 className="card__heading">
                <span className="card__heading-span card__heading-span--2 bold-white">
                  Thesis-Precized
                </span>
              </h4>
              <div className="card__details">
                <p>
                  Inspire us to redefine the tech landscape. Thesis Precised is
                  your platform to present and engage in the presentation as
                  they delve into the captivating realm of your thesis
                  precisely. Emerge victorious, and you take home the
                  title of BEST PAPER.
                </p>
              </div>
            </div>
            <div className="card__side card__side--back card__side--back-2">
              <div className="card__cta">
                <div className="card__price-box">
                  <p
                    className="btn btn--white"
                    onClick={() =>
                      toggle(
                        "Thesis-Precized",
                        "Inspire us to redefine the tech landscape. Thesis Precised is your platform to present and engage in the presentation as they delve into the captivating realm of your thesis precisely. Emerge victorious, and you take home the title of BEST PAPER.",
                        "Harini A",
                        "Poovizhi P",
                        "+91 99520 51446",
                        "+91 91500 02718",
                        "forms.gle/G9GTWJTvh4SZGvqJA",
                        "HCL Lab (First Floor) / AV Hall (Second Floor - Library ) "
                      )
                    }
                  >
                    Know More
                  </p>
                </div>
                <a className="btn btn--white">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-1-of-3">
          <div className="card" data-aos="zoom-in">
            <div className="card__side card__side--front">
              <div className="card__picture card__picture--3-tech">&nbsp;</div>
              <h4 className="card__heading">
                <span className="card__heading-span card__heading-span--3 bold-white">
                  Coin Quest
                </span>
              </h4>
              <div className="card__details">
                <p>
                  Ever wanted to participate in a digital tech game event?
                  Here's your chance! Participants play a series of wordplay,
                  quizzes, and games that advance through rounds. Get ready to
                  tech it up at Coin Quest.
                </p>
              </div>
            </div>
            <div className="card__side card__side--back card__side--back-3">
              <div className="card__cta">
                <div className="card__price-box">
                  <p
                    className="btn btn--white"
                    onClick={() =>
                      toggle(
                        "Coin Quest",
                        "Ever wanted to participate in a digital tech game event? Here's your chance! Participants play a series of wordplay, quizzes, and games that advance through rounds. Get ready to tech it up at Coin Quest.",
                        "Ram Kumar M",
                        "Priyadharshini N",
                        "+91 63809 41457",
                        "+91 73959 30205",
                        "forms.gle/P3QNm3woRoMd6bF66",
                        "F1 - First Floor"
                      )
                    }
                  >
                    Know More
                  </p>
                </div>
                <a className="btn btn--white">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm-padding" id="section-tours">
        <div className="row">
          <div className="col-1-of-3">
            <div className="card" data-aos="zoom-in">
              <div className="card__side card__side--front">
                <div className="card__picture card__picture--4-tech">
                  &nbsp;
                </div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--1 bold-white">
                    Plutus
                  </span>
                </h4>
                <div className="card__details">
                  <p>
                    66% of all statistics are made up. And we just made this up
                    too. Plutus is an event based on the popular party game 2
                    Facts 1 Lie, albeit with a business touch to it! Unravel
                    the truth from a web of captivating statements.
                  </p>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-1">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p
                      className="btn btn--white"
                      onClick={() =>
                        toggle(
                          "Plutus",
                          "66% of all statistics are made up. And we just made this up too. Plutus is an event based on the popular party game 2 Facts 1 Lie, albeit with a business touch to it! Unravel the truth from a web of captivating statements.",
                          "Vinoth S",
                          "Adithya B",
                          "+91 93425 37734",
                          "+91 73390 44512",
                          "forms.gle/2r5S34Nfzvnivrzx6",
                          "F3 - First Floor"
                        )
                      }
                    >
                      Know More
                    </p>
                  </div>
                  <a className="btn btn--white">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1-of-3">
            <div className="card" data-aos="zoom-in">
              <div className="card__side card__side--front">
                <div className="card__picture card__picture--5-tech">
                  &nbsp;
                </div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--1 bold-white">
                  ALGO-RHYTHMS
                  </span>
                </h4>
                <div className="card__details">
                  <p>
                    Are you ready to dive into a world where melodies are
                    composed by lines of code, and rhythm is dictated by
                    algorithms? Here, the tech enthusiast delves into coding
                    against the distraction of music. Let the beats
                    and coding begin!
                  </p>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-1">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p
                      className="btn btn--white"
                      onClick={() =>
                        toggle(
                          "ALGO-RHYTHMS",
                          "Are you ready to dive into a world where melodies are composed by lines of code, and rhythm is dictated by algorithms? Here, the tech enthusiast delves into coding against the distraction of music. Let the beats and coding begin!",
                          "Nisha V",
                          "Harisha BS",
                          "+91 63699 46328",
                          "+91 97105 14448",
                          "forms.gle/KQrFXKMjRHmNKVMC6",
                          "Mobile App Lab - First Floor"
                        )
                      }
                    >
                      Know More
                    </p>
                  </div>
                  <a className="btn btn--white">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1-of-3">
            <div className="card" data-aos="zoom-in">
              <div className="card__side card__side--front">
                <div className="card__picture card__picture--6-tech">
                  &nbsp;
                </div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--1 bold-white">
                  FLIP IT & QUIZ IT
                  </span>
                </h4>
                <div className="card__details">
                  <p>
                    Prepare for an event of mind-bending scenarios, where the participants will
                    be presented with complex situational questions that demand creative problem-solving,
                    but the twist lies in who can master the art of bottle flipping to secure their chance
                    to answer first.
                  </p>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-1">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p
                      className="btn btn--white"
                      onClick={() =>
                        toggle(
                          "FLIP IT & QUIZ IT",
                          "Prepare for an event of mind-bending scenarios, where the participants will be presented with complex situational questions that demand creative problem-solving, but the twist lies in who can master the art of bottle flipping to secure their chance to answer first. Join us for a journey of intellect and strategy at 'Flip it & Quiz it'.",
                          "Navinaa G",
                          "Mahmoodah Hafsah S",
                          "+91 90802 30690",
                          "+91 99402 61966",
                          "forms.gle/KQrFXKMjRHmNKVMC6",
                          "F22 - First Floor"
                        )
                      }
                    >
                      Know More
                    </p>
                  </div>
                  <a className="btn btn--white">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm-padding" id="section-tours">
        <div className="row">
        <div className="col-1-of-3">
            <div className="card" data-aos="zoom-in">
              <div className="card__side card__side--front">
                <div className="card__picture card__picture--6-tech">
                  &nbsp;
                </div>
                <h4 className="card__heading">
                  <span className="card__heading-span card__heading-span--1 bold-white">
                  Virtuoso
                  </span>
                </h4>
                <div className="card__details">
                  <p>
                  Paying homage to Vijay TV's iconic Start Music, we're raising the stakes
                    in music games. Evoke your inner music detective in a dynamic guessing game
                    event with three rounds of song and melody challenges. Join us for a day filled
                    with musical excitement at Virtuoso!
                  </p>
                </div>
              </div>
              <div className="card__side card__side--back card__side--back-1">
                <div className="card__cta">
                  <div className="card__price-box">
                    <p
                      className="btn btn--white"
                      onClick={() =>
                        toggle(
                            "VIRTUOSO",
                            "Paying homage to Vijay TV's iconic Start Music, we're raising the stakes in music games. Evoke your inner music detective in a dynamic guessing game event with three rounds of song and melody challenges. Join us for a day filled with musical excitement at Virtuoso!",
                            "Mathuku Jayasimha Reddy",
                            "Abirami S",
                            "+91 83412 73412",
                            "+91 73582 90831",
                            "forms.gle/2r5S34Nfzvnivrzx6",
                            "F-23 First Floor"
                        )
                      }
                    >
                      Know More
                    </p>
                  </div>
                  <a className="btn btn--white">
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    

      {/* <PopupModal isOpen={isPopupVisible} toggle={() => setPopupVisible(!isPopupVisible)} eventInfo={eventInfo} /> */}
      <PopupModal
        title={eventInfo.heading}
        content={eventInfo.content}
        name1={eventInfo.org1Name}
        name2={eventInfo.org2Name}
        phone1={eventInfo.org1Phone}
        phone2={eventInfo.org2Phone}
        register={eventInfo.registrationLink}
        venue={eventInfo.venue}
        isVisible={isPopupVisible}
        toggle={() => setPopupVisible(!isPopupVisible)}
      />
    </div>
  );
};

export default TechEvents;
