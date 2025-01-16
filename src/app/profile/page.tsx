"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Aos from "aos";
import "aos/dist/aos.css";
import "./profile.css";
import BackgroundAnimation from "../components/main/backgroundanimation";

const Profile: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

    useEffect(() => {
        // Initialize AOS animation
        Aos.init({ duration: 1500 });

        // Authentication listener
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(user?.uid);
            const uid = user?.uid;
            if (user) {
                setUser(user);
                try {
                    const usersCollection = collection(db, "users");
                    const q = query(usersCollection, where("uid", "==", uid));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    console.log(data);
                    setUserData(data[0]);
                    console.log(process.env.CLOUDINARY_CLOUD_NAME)
                    const cloudinaryUrl = `https://res.cloudinary.com/dgcmiagav/image/upload/v1/zorphix/qrcodes/${uid}`;
                    setQrCodeUrl(cloudinaryUrl);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                router.push("/login");
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [router]);

    const handleBack = () => {
        router.push("/");
    };

    return (
        <div id="profile" className="section-profile" data-aos="fade-up">
            <BackgroundAnimation />
            {/* Top Navigation */}
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
                            <p>Loading QR code...</p>
                        )}
                    </div>
                    {userData ? (
                        <>
                            <p className="profile__field">
                                <b>Name:</b> {userData.name || "N/A"}
                            </p>
                            <p className="profile__field">
                                <b>Email:</b> {userData.email || "N/A"}
                            </p>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
