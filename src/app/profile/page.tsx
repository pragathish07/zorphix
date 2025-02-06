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

    const loadImageAsBase64 = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };

    const DownloadODLetter = async() => {
        if (!userData?.registeredEvents || userData.registeredEvents.length === 0) {
            toast.error("You have not registered for any events!");
            return;
        }
    
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size
    
        // Load images (logo and signature)
        const loadImage = async (url: string) => {
            const response = await fetch(url);
            const imageBytes = await response.arrayBuffer();
            return pdfDoc.embedPng(imageBytes);
        };
    
        const leftLogo = await loadImage("/img/cit.png"); // Left logo
        const rightLogo = await loadImage("/img/loginlog.png"); // Right logo
        const signatureImage = await loadImage("/img/loginlog.png");
    
        // Add header images (left & right logos)
        page.drawImage(leftLogo, {
            x: 30,
            y: 770,
            width: 200,
            height: 70,
        });
    
        page.drawImage(rightLogo, {
            x: 420,
            y: 770,
            width: 120,
            height: 50,
        });
    
        // Set fonts
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        page.setFont(font);
        
        // Header Text
        let yPos = 720;
        const lineHeight = 15;
        const maxWidth = 500;
        const marginLeft = 50;
        
        const headerText = [
            "FROM,",
            "TEAM ZORPHIX,",
            "DEPARTMENT OF COMPUTER SCIENCE AND BUSINESS SYSTEMS,",
            "CHENNAI INSTITUTE OF TECHNOLOGY,",
            "KUNDRATHUR - 600069"
        ];
        
        headerText.forEach((line) => {
            page.drawText(line, { x: 50, y: yPos, size: 12, color: rgb(0, 0, 0) });
            yPos -= lineHeight;
        });
    
        yPos -= 10; // Space before recipient
    
        // Recipient Details
        const recipientText = [
            "TO,",
            "HEAD OF DEPARTMENT,",
            `DEPARTMENT OF ${userData.department.toUpperCase()},`,
            `${userData.collegeName.toUpperCase()}`
        ];
        
        recipientText.forEach((line) => {
            page.drawText(line, { x: 50, y: yPos, size: 12 });
            yPos -= lineHeight;
        });
    
        yPos -= 10; // Space before subject
    
        // Subject
        page.drawText("SUBJECT: Requesting permission to grant on-duty for participant-reg", { 
            x: 50, 
            y: yPos, 
            size: 12 
        });
    
        yPos -= 30; // Space before body text


        const wrapParagraph = (text: string, maxWidth: number, fontSize: number) => {
            const words = text.split(" ");
            let lines = [];
            let currentLine = "";
    
            words.forEach((word) => {
                let testLine = currentLine + word + " ";
                let textWidth = font.widthOfTextAtSize(testLine, fontSize);
                if (textWidth > maxWidth) {
                    lines.push(currentLine.trim());
                    currentLine = word + " ";
                } else {
                    currentLine = testLine;
                }
            });
    
            lines.push(currentLine.trim());
            return lines;
        };
    
        // **Body Text as a Formal Paragraph**
        const bodyParagraph = `Respected Sir/Ma’am,
        
        We take immense pleasure in informing you that we, the Department of Computer Science & Business Systems, are conducting Zorphix 2025 - our national-level techno-management symposium. Zorphix is set to happen on the 18th of February, 2025 at Chennai Institute of Technology.
        
        We are pleased to host ${userData.name}, ${userData.department}, ${userData.year || "N/A"} year from your institution as our participant for our symposium. Hence, we kindly request you to grant them permission to be on-duty on the day of the event. Thank you.`;
    
        // **Wrap and Print Body Text**
        const wrappedLines = wrapParagraph(bodyParagraph, maxWidth - marginLeft, 12);
        wrappedLines.forEach((line) => {
            if (yPos < 100) return; // Prevents text from going out of the page
            page.drawText(line, { x: marginLeft, y: yPos, size: 12 });
            yPos -= lineHeight;
        });
    
        yPos -= 10; // Space before signature
    
        // Add Signature Image above "Best Regards"
        page.drawImage(signatureImage, {
            x: 50,
            y: yPos,
            width: 100,
            height: 40,
        });
    
        yPos -= 50; // Space before Best Regards
    
        // Footer
        const footerText = [
            "Best Regards,",
            "Team Zorphix",
            "(Mr. G. Senthil Kumar, Head of Department, Chennai Institute of Technology)",
            "For any queries, contact: Bharath V - 9751583361"
        ];
    
        footerText.forEach((line) => {
            page.drawText(line, { x: 50, y: yPos, size: 10 });
            yPos -= lineHeight;
        });
    
        // Save & Download the PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Permission_Letter_${userData.name}.pdf`;
        link.click();
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
                                            <button onClick={DownloadODLetter} disabled={!agreed} className="download-btn">
                                                Download OD Letter
                                            </button>
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
