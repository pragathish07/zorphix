"use client";

import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { toast } from "react-toastify";
import '../src/app/profile/profile.css'

const ODLetter = ({ userData,agreed }: { userData: any ,agreed:boolean}) => {
    const generatePDF = async () => {
       /*  if (!userData?.registeredEvents || userData.registeredEvents.length === 0) {
            toast.error("You have not registered for any events!");
            return;
        } */

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size

        // Load Images (Logos & Signature)
        const loadImage = async (url: string) => {
            const response = await fetch(url);
            const imageBytes = await response.arrayBuffer();
            return pdfDoc.embedPng(imageBytes);
        };

        const leftLogo = await loadImage("/img/cit.png"); // Left logo
        const rightLogo = await loadImage("/img/loginlog.png"); // Right logo
        const signatureImage = await loadImage("/img/hod-sign.png");

        // Set Font
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        page.setFont(font);

        // Text positioning variables
        let yPos = 770;
        const lineHeight = 15;
        const marginLeft = 50;
        const maxWidth = 495; // Ensures text doesn't overflow

        // Add Header Images (Left & Right Logos)
        page.drawImage(leftLogo, { x: 30, y: yPos, width: 200, height: 60 });
        page.drawImage(rightLogo, { x: 420, y: yPos, width: 150, height: 60 });

        yPos -= 60; // Space below images

        // **Header Text**
        const headerText = [
            "FROM,",
            "TEAM ZORPHIX,",
            "DEPARTMENT OF COMPUTER SCIENCE AND BUSINESS SYSTEMS,",
            "CHENNAI INSTITUTE OF TECHNOLOGY,",
            "KUNDRATHUR - 600069"
        ];
        headerText.forEach((line) => {
            page.drawText(line, { x: marginLeft, y: yPos, size: 12 });
            yPos -= lineHeight;
        });

        yPos -= 10; // Space before recipient

        // **Recipient Details**
        const recipientText = [
            "TO,",
            "HEAD OF DEPARTMENT,",
            `DEPARTMENT OF ${userData.department.toUpperCase()},`,
            `${userData.collegeName.toUpperCase()}`
        ];
        recipientText.forEach((line) => {
            page.drawText(line, { x: marginLeft, y: yPos, size: 12 });
            yPos -= lineHeight;
        });

        yPos -= 20; // Space before subject

        // **Subject**
        page.drawText("SUBJECT: Requesting permission to grant on-duty for participant-reg", {
            x: marginLeft,
            y: yPos,
            size: 12,
        });

        yPos -= 30; // Space before body text

        // **Text Wrapping Function**
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

        // **Letter Body (Manual Line Break Handling)**
        const bodyParagraphs = [
            "Respected Sir/Ma’am,",
            "We take immense pleasure in informing you that we, the Department of Computer Science & Business Systems, are conducting Zorphix 2025 - our national-level techno-management symposium. Zorphix is set to happen on the 18th of February, 2025 at Chennai Institute of Technology.",
            `We are pleased to host ${userData.name}, ${userData.department.toUpperCase()}, ${userData.year || "N/A"} year from your institution as our participant for our symposium. Hence, we kindly request you to grant them permission to be on-duty on the day of the event. Thank you.`
        ];

        bodyParagraphs.forEach((paragraph) => {
            const wrappedLines = wrapParagraph(paragraph, maxWidth - marginLeft, 12);
            wrappedLines.forEach((line) => {
                if (yPos < 100) return; // Prevents text from going out of the page
                page.drawText(line, { x: marginLeft, y: yPos, size: 12 });
                yPos -= lineHeight;
            });
            yPos -= 10; // Extra space between paragraphs
        });

        yPos -= 80; // Space before signature

        // **Add Signature Image Above "Best Regards"**
        page.drawImage(signatureImage, { x: 50, y: yPos, width: 100, height: 70 });

        yPos -= 5; // Space before Best Regards

        // **Footer**
        const footerText = [
            "Best Regards,",
            "Team Zorphix",
            "(Mr. G. Senthil Kumar, Head of Department, Chennai Institute of Technology)",
            "For any queries, contact: Bharath V - 9751583361"
        ];

        footerText.forEach((line) => {
            page.drawText(line, { x: marginLeft, y: yPos, size: 10 });
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
        <button onClick={generatePDF} className="download-btn" disabled={!agreed}>
            Download OD Letter
        </button>
    );
};

export default ODLetter;
