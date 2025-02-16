const nodemailer = require("nodemailer");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");


// 🔹 Email List (Replace with actual email addresses)
/* const recipients = [
    { email: "sec24am063@sairamtap.edu.in", name: "A.KRISHNAVENI", college: "Sri Sairam Engineering College", department: "CSE-AIML", year: "1st Year" },
    { email: "akshayapalanivel110505@gmail.com", name: "AKSHAYA", college: "Vel Tech Multi Tech", department: "ECE", year: "1st Year" },
    { email: "iamswathy1981@gmail.com", name: "Akshaya J", college: "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "CSE A", year: "1st Year" },
    { email: "jeevadharani2403@gmail.com", name: "Anisha S", college: "Vel Tech High Tech", department: "CSE", year: "1st Year" },
    { email: "sec24cb030@sairamtap.edu.in", name: "Ashwini B", college: "Sri Sai Ram Engineering College", department: "CSBS", year: "1st Year" },
    { email: "bavadharini26170@gmail.com", name: "BAVADHARANI P", college: "Sri Sairam Engineering College", department: "CSBS", year: "1st Year" },
    { email: "cm0179@srmist.edu.in", name: "Chandru M", college: "SRM Science and Technology Katankalathur", department: "Artificial Intelligence", year: "3rd Year" },
    { email: "iamswathy1981@gmail.com", name: "Charmi S J", college: "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "CSE A", year: "1st Year" },
    { email: "abinayadakshiraju@gmail.com", name: "DAKSHIRAJU ABINAYA", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "ECE", year: "1st Year" },
    { email: "damodar6302@gmail.com", name: "DAMODAR BURLE", college: "Saveetha School of Engineering", department: "Artificial Intelligence and Data Science", year: "3rd Year" },
    { email: "dharshinirm08@gmail.com", name: "Dharshini R M", college: "Panimalar Engineering College", department: "CSE", year: "1st Year" },
    { email: "sabarivinayagam1977@gmail.com", name: "Dharshini V", college: "Panimalar Engineering College", department: "Computer Science Engineering", year: "1st Year" },
    { email: "divya18825@gmail.com", name: "Divya A", college: "BE", department: "CSE", year: "1st Year" },
    { email: "subhiksha234@gmail.com", name: "DIVYA V", college: "Panimalar Engineering College", department: "IT", year: "3rd Year" },
    { email: "hannahgracev380@gmail.com", name: "HANNAHGRACE V", college: "Panimalar Engineering College", department: "IT", year: "3rd Year" },
    { email: "krishhari4545@gmail.com", name: "HARI KRISHNAN M", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "Electronics and Communication", year: "1st Year" },
    { email: "harshi.k0211@gmail.com", name: "Harshita K", college: "Vel Tech Multi Tech", department: "ECE", year: "1st Year" },
    { email: "thulasithulasi1812@gmail.com", name: "I.THULASI", college: "Saveetha School Of Engineering", department: "Information Technology", year: "1st Year" },
    { email: "iswaryasekar591@gmail.com", name: "Iswarya S", college: "SIMATS Engineering", department: "AI & DS", year: "1st Year" },
    { email: "jeeva2403hua@gmail.com", name: "Jeevadharani VG", college: "Vel Tech High Tech", department: "CSE", year: "1st Year" },
    { email: "joyceruby713@gmail.com", name: "Joyce Ruby", college: "Vel Tech Multi Tech", department: "ECE", year: "1st Year" },
    { email: "kamsovignesh41@gmail.com", name: "K.V.Kameshvaran", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "Mechanical", year: "1st Year" },
    { email: "k59513951@gmail.com", name: "Karan K", college: "Dr MGR Educational and Research Institute", department: "Information Technology", year: "3rd Year" },
    { email: "sec24cb076@sairamtap.edu.in", name: "Karthika", college: "Sri Sai Ram Engineering College", department: "Computer Science and Business System", year: "1st Year" },
    { email: "pujapatel984065@gmail.com", name: "Keerthika V", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "Biomedical Engineering", year: "1st Year" },
    { email: "kodishwari04@gmail.com", name: "Kodishwari M", college: "Vel Tech Multi Tech", department: "ECE", year: "1st Year" },
    { email: "depicahkonidala@gmail.com", name: "Konidala Depicah", college: "SRM Institute of Science and Technology", department: "CSBS A", year: "1st Year" },
    { email: "moshika.emk@gmail.com", name: "Koushik P", college: "SIMATS Engineering", department: "IT", year: "1st Year" },
    { email: "sec24cb117@sairamtap.edu.in", name: "Leshmi V", college: "Sri Sai Ram Engineering College", department: "CSBS", year: "1st Year" },
    { email: "pujapatel984065@gmail.com", name: "Logeshwari L", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "Biomedical Engineering", year: "1st Year" },
    { email: "lokeshkannandurairaj@gmail.com", name: "LOKESHKANNAN DURAIRAJ", college: "SIMATS Engineering", department: "Biotechnology", year: "1st Year" },
    { email: "moshika.emk@gmail.com", name: "M.Moshika", college: "SIMATS Engineering", department: "AI and DS", year: "1st Year" },
    { email: "rohinimohan1908@gmail.com", name: "M.Rohini", college: "Saveetha School of Engineering", department: "Information Technology", year: "1st Year" },
    { email: "zeenathalshifa20@gmail.com", name: "M.zeenath Al Shifa", college: "Saveetha Institute of Medical and Technical Science", department: "Biotechnology", year: "1st Year" },
    { email: "mithunvijayakumar2006@gmail.com", name: "MITHUN V", college: "Sri Sai Ram Engineering College", department: "CSBS", year: "1st Year" },
    { email: "mohammednazeer679@gmail.com", name: "MOHAMMED NAZEER DB", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala College of Engineering", department: "Mechanical", year: "1st Year" },
    { email: "mohanjayakumar2006@gmail.com", name: "MOHAN KUMAR J", college: "SIMATS Engineering", department: "AI&DS", year: "1st Year" },
    { email: "mrinalini1710@gmail.com", name: "Mrinalini V", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "ECE", year: "1st Year" },
    { email: "priyadhasinipriya@gmail.com", name: "N.Priyadharshini", college: "Meenakshi College of Engineering", department: "Information Technology", year: "3rd Year" },
    { email: "nandakishore.s.2023.csbs@ritchennai.edu.in", name: "NANDA KISHORE", college: "Rajalakshmi Institute of Technology", department: "CSBS", year: "2nd Year" },
    { email: "nandysara7@gmail.com", name: "Nanditha S", college: "SIMATS Engineering", department: "ECE", year: "1st Year" },
    { email: "jeevithapunithan21@gmail.com", name: "P. Jeevitha", college: "Panimalar Engineering College", department: "CSBS", year: "1st Year" },
    { email: "sanjanamurugesan0504@gmail.com", name: "Sanjana M", college: "M SANJANA", department: "Computer Science and Business System", year: "1st Year" },
    { email: "sandhiyasand5544@gmail.com", name: "Sandhiya B", college: "SIMATS Engineering", department: "IT", year: "1st Year" },
    { email: "subhikshaitc2004@gmail.com", name: "Subhiksha B", college: "Panimalar Engineering College", department: "Information Technology", year: "3rd Year" },
    { email: "sudeshvagent6@gmail.com", name: "Sudesh V", college: "Panimalar Engineering College", department: "CSE", year: "1st Year" },
    { email: "suganthapriyan278@gmail.com", name: "Sugantha Priyan", college: "Panimalar Engineering College", department: "CSE", year: "1st Year" },
    { email: "suriyaayyappan728@gmail.com", name: "Suriya A", college: "Panimalar Engineering College", department: "Computer Science and Engineering", year: "1st Year" },
    { email: "subeeksha7@gmail.com", name: "SUSHMITHA TJ", college: "Panimalar Engineering College", department: "IT", year: "3rd Year" },
    { email: "naidujagadeesh373@gmail.com", name: "T. Sai Jagadeesh", college: "Saveetha School of Engineering", department: "AI-DS", year: "3rd Year" },
    { email: "t1868177@gmail.com", name: "TAMILSELVAN U", college: "Sri Sai Ram Engineering College", department: "ECE", year: "1st Year" },
    { email: "sec24cb067@sairamtap.edu.in", name: "TANUSHREE S", college: "Sri Sai Ram Engineering College", department: "CSBS", year: "1st Year" },
    { email: "varsharajesh0402@gmail.com", name: "Usha K", college: "IFET College of Engineering", department: "Information Technology", year: "1st Year" },
    { email: "pujapatel984065@gmail.com", name: "Vedika Sri V", college: "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College", department: "BME", year: "1st Year" },
    { email: "vindhyak1706@gmail.com", name: "Vindhya K", college: "Rajalakshmi Institute of Technology", department: "Computer Science and Business System", year: "2nd Year" },
    { email: "kevinraj607@gmail.com", name: "Kevinraj A", college: "Panimalar Engineering College", department: "Information Technology", year: "1st Year" }
]; */

const recipients = [
/*     { email: "ancinancin16@gmail.com", name: "ANCIN MEJO.M", college: "Panimalar Engineering College", department: "Information Technology", year: "1st Year" },
    { email: "boobeshsaravanan22@gmail.com", name: "Boobesh S. M", college: "Panimalar Engineering College", department: "Information Technology", year: "1st Year" },
    { email: "manojkumar2007veera@gmail.com", name: "Manoj Kumar V", college: "Panimalar Engineering College", department: "Information Technology", year: "1st Year" },
    { email: "kevinraj607@gmail.com", name: "Kevinraj A", college: "Panimalar Engineering College", department: "Information Technology", year: "1st Year" } */
    { email: "pragarajesh779jd@gmail.com", name: "praga", college: "Panimalar Engineering College", department: "Information Technology", year: "1st Year" }
];




// 🔹 Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465
    auth: {
        user: "zorphix@citchennai.net",
        pass: "tzgkrozvadgtbdcb"
    }
});

// 🔹 Generate Personalized OD Letter PDF
const generatePDF = async () => {
        
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size

        // Load Images (Logos & Signature)
        const loadImage = async (url) => {
            const response = await fetch(url);
            const imageBytes = await response.arrayBuffer();
            return pdfDoc.embedPng(imageBytes);
        };

        const leftLogo = await loadImage("./cit.png"); // Left logo
        const rightLogo = await loadImage("./loginlog.png"); // Right logo
        const signatureImage = await loadImage("/hod-sign.png");

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
        const wrapParagraph = (text, maxWidth ,fontSize) => {
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


    // Save PDF as Buffer
    return await pdfDoc.save();
};

// 🔹 Send Email with PDF Attachment
const sendEmailWithPDF = async (user) => {
    const pdfBytes = await generatePDF(user);
    const pdfBuffer = Buffer.from(pdfBytes);

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Your OD Letter - Zorphix 2025",
        text: `Dear ${user.name},\n\nPlease find attached your OD letter for Zorphix 2025.\n\nBest Regards,\nTeam Zorphix`,
        attachments: [
            {
                filename: `OD_Letter_${user.name}.pdf`,
                content: pdfBuffer,
                contentType: "application/pdf"
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${user.email}`);
    } catch (error) {
        console.error(`❌ Failed to send email to ${user.email}:`, error);
    }
};

// 🔹 Process & Send Emails to All Recipients
const sendODLetters = async () => {
    for (const user of recipients) {
        await sendEmailWithPDF(user);
    }
    console.log("✅ All OD letters sent successfully!");
};

// Execute the function
sendODLetters();
