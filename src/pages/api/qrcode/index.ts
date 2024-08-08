import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import { NextApiRequest,NextApiResponse } from 'next';

const transporter=nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth:{
    user:process.env.GMAIL_USER,
    pass:process.env.GMAIL_PASS
  }
})

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const name:String = req.body.name;
    const email:any = req.body.email;
    const uid:any=req.body.uid;
    const qrCodeData = await QRCode.toDataURL(uid);

    transporter.sendMail({
      to:email,
      subject:"test",
      html:`
      
        <!-- Banner Image -->
        <img src="your-banner-url.jpg" alt="Zorphix Symposium Banner" class="banner-image">

        <h1 class="custom-heading">Welcome to Zorphix 2024!</h1>
        
        <p class="event-details">
            Welcome ${name},We are excited to announce that Zorphix, a national-level symposium, is being conducted by the Computer Science and Business System department at Chennai Institute of Technology, Kundrathur. This event is a great opportunity to engage, learn, and grow with like-minded individuals in the field.
        </p>
        
        <p class="event-details">
            <strong>Details of the Event:</strong><br>
            Zorphix is a national-level symposium conducted by the Computer Science and Business System department at Chennai Institute of Technology, Kundrathur. It is going to be held on 14th September 2024.
        </p>
        
        <div class="left-aligned">
            <p class="event-details">
                <strong>Date:</strong><br>
                14th September 2024
            </p>
            
            <p class="event-details">
                <strong>Venue:</strong><br>
                Chennai Institute of Technology, Kundrathur
            </p>
        </div>
        
        <p class="event-details" style="text-align: center;">
            Thank you for registering for this event! We look forward to your participation and hope you have a fruitful experience.
        </p>
      `,
      attachments: [
        {
          filename: 'qrcode.png',
          path: qrCodeData,
        },
      ],
    })
    .then(()=>{
      console.log("Email sent successfully");
      res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch((err)=>{
      console.log(err);
    })

     } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
