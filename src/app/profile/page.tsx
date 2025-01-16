"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './profile.css';
import BackgroundAnimation from '../components/main/backgroundanimation';

const Profile: React.FC = () => {
    const router = useRouter();
    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const handleBack = () => {
        router.push('/home');
    };

    return (
        <div id="profile" className="section-profile" data-aos="fade-up">
            <BackgroundAnimation />
            {/* Top Navigation */}
            <div className="profile__navigation">
                <button className="profile__back-button" onClick={handleBack}>
                    &lt;
                </button>
                <button className="profile__logout-button">
                    Logout
                </button>
            </div>

            {/* Profile Details */}
            <div className="profile__details u-center-text u-margin-top">
                <h2 className="heading-secondary">Profile</h2>

                <div className="profile__info u-margin-top-medium">
                <div className="profile__qr u-margin-top-big">
                    <img
                        src="/img/cake_logo_white.png"
                        alt="QR Code"
                        className="profile__qr-image"
                    />
                </div>
                    <p className="profile__field">
                        <b>Name:</b> John Doe
                    </p>
                    <p className="profile__field">
                        <b>Email:</b> john.doe@example.com
                    </p>
                    {/* <p className="profile__field">
            <b>Registered Events:</b> Hackathon 2024, AI Workshop
          </p> */}
                </div>


            </div>
        </div>
    );
};

export default Profile;
