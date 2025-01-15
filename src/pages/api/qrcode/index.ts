import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';
import { getEmailTemplate } from '../../../../utils/emailTemplate'; // Adjust path if necessary

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        email,
        uid,
        department,
        year,
        contactNo,
        collegeName,
        degree,
      } = req.body;

      // Combine all fields into an object for the QR code
      const qrData = {
        uid,
        name,
        email,
        department,
        year,
        contactNo,
        collegeName,
        degree,
      };

      // Convert the object to a JSON string
      const qrCodeData = await QRCode.toDataURL(JSON.stringify(qrData));

      // Upload the QR code to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(qrCodeData, {
        folder: 'zorphix/qrcodes', // Optional folder in Cloudinary
        public_id: uid, // Use UID as the public ID for easy retrieval
        overwrite: true,
      });

      const qrCodeUrl = cloudinaryResponse.secure_url; // Get the URL of the uploaded image

      // Send the email with the QR code link
      await transporter.sendMail({
        to: email,
        subject: "Welcome to Zorphix 2024!",
        html: getEmailTemplate(name), // Use your email template here
        attachments: [
          {
            filename: `${uid}.png`,
            path: qrCodeUrl, // Use the Cloudinary URL
          },
        ],
      });

      console.log("Email sent successfully");
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
