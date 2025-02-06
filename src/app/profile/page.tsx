"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Aos from "aos";
import "aos/dist/aos.css";
import "./profile.css";
import "../globals.css"
import BackgroundAnimation from "../components/main/backgroundanimation";
import Link from "next/link";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Modal from "react-modal";
import ODLetterDownload from "../../../utils/odLetterTemplate";

const Profile: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
    const [modalOpen, setModalOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 1500 });
    
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/auth/login");
                return;
            }
    
            setUser(user);
            try {
                const userRef = doc(db, "users", user.uid); 
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                } else {
                    console.error("User document not found in Firestore.");
                }
    
               
                const cloudinaryUrl = `https://res.cloudinary.com/djb1txmhn/image/upload/v1/zorphix/qrcodes/${user.uid}`;
                setQrCodeUrl(cloudinaryUrl);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        });
    
        return () => unsubscribe();
    }, [router]);

    const handleBack = () => {
        router.push("/");
    };

    /// od letter functions starts from here

    const handleGenerateOD = () => {
        if (!userData?.registeredEvents || userData.registeredEvents.length === 0) {
            toast.error("You have not registered for any events!");
            return;
        }
        setModalOpen(true); // Open confirmation modal
    };

    
    

    return (
        <div id="profile" className="section-profile" data-aos="fade-up">
            <BackgroundAnimation />
           
            <div className="profile__navigation">
                <button className="profile__back-button" onClick={handleBack}>
                    &lt;
                </button>
                <button
                    className="profile__logout-button"
                    onClick={() => auth.signOut()}
                >
                    Logout
                </button>
            </div>

            {/* Profile Details */}
            <div className="profile__details u-center-text u-margin-top">
                <h2 className="heading-secondary">Profile</h2>
                <div className="profile__info u-margin-top-medium">
                    <div className="profile__qr u-margin-top-big">
                        {qrCodeUrl ? (
                            <img
                                src={qrCodeUrl}
                                alt="QR Code"
                                className="profile__qr-image"
                            />
                        ) : (
                            <p className="loading-text">Loading QR code...</p>
                        )}
                    </div>
                    {userData ? (
                        <div className="profile-card">
                            <h2 className="profile-title">User Profile</h2>
                            <div className="profile-info">
                                <p><b>Name:</b> {userData.name || "N/A"}</p>
                                <p><b>Email:</b> {userData.email || "N/A"}</p>
                                <p><b>College:</b> {userData.collegeName || "N/A"}</p>
                                <p><b>Department:</b> <span>{userData.department || "N/A"}</span></p>
                            </div>

                            {userData.registeredEvents?.length > 0 && (
                                <div className="profile-events">
                                    <h3>Registered Events</h3>
                                    <ul>
                                        {userData.registeredEvents.map((event: any, index: number) => (
                                            <li key={index}>{event.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="profile-cta-section">
                                    <a 
                                    className="btn btn--white btn--animated bold"
                                    href="/#events"
                                    >
                                    Explore ↗
                                    </a>
                                    <button onClick={handleGenerateOD} className="btn btn--white btn--animated bold">
                                        Request OD
                                    </button>

                                    <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal">
                                        <h2>Confirm Before Downloading</h2>
                                        <p>Please ensure that:</p>
                                        <ul>
                                            <li>You will use this letter only for its intended purpose.</li>
                                            <li>Your details in this letter are correct.</li>
                                        </ul>

                                        <label>
                                            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
                                            I confirm the above statements.
                                        </label>

                                        <div className="modal-actions">
                                            <button onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button>
                                            {/* <button onClick={DownloadODLetter} disabled={!agreed} className="download-btn">
                                                Download OD Letter
                                            </button> */}
                                            <ODLetterDownload userData={userData} agreed={agreed}/>
                                        </div>
                                    </Modal>
                            
                            </div>
                           
                        </div>
                        
                    ) : (
                        <p className="loading-text">Loading user data...</p>
                    )}


                </div>
            </div>
        </div>
    );
};

export default Profile;
