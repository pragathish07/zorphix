export const getEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zorphix 2025 Symposium Invitation</title>
    <style type="text/css">
        /* Reset styles for email clients */
        body, table, td, a { 
            -webkit-text-size-adjust: 100%; 
            -ms-text-size-adjust: 100%; 
        }
        table, td { 
            mso-table-lspace: 0pt; 
            mso-table-rspace: 0pt; 
        }
        img { 
            -ms-interpolation-mode: bicubic; 
            border: 0; 
            height: auto; 
            max-width: 100%; 
        }

        /* Email body styles */
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .banner-image {
            width: 100%;
            height: auto;
            display: block;
        }

        .content-wrapper {
            padding: 30px;
            background-color: white;
        }

        .custom-heading {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }

        .event-details {
            color: #34495e;
            margin-bottom: 20px;
        }

        .event-details strong {
            color: #2980b9;
            display: block;
            margin-bottom: 5px;
        }

        .left-aligned {
            display: flex;
            justify-content: space-between;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .left-aligned p {
            margin: 0;
            flex: 1;
        }

        .footer {
            text-align: center;
            padding: 20px;
            background-color: #3498db;
            color: white;
            font-size: 14px;
        }

        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                border-radius: 0;
            }
            .content-wrapper {
                padding: 15px;
            }
            .left-aligned {
                flex-direction: column;
            }
            .left-aligned p {
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table class="email-container" width="600" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td>
                            <img src="your-banner-url.jpg" alt="Zorphix Symposium Banner" class="banner-image">
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <h1 class="custom-heading">Welcome to Zorphix 2025!</h1>

                            <p class="event-details">
                                Welcome ${name}, We are excited to announce that Zorphix, a national-level symposium, is being conducted by the Computer Science and Business System department at Chennai Institute of Technology, Kundrathur. This event is a great opportunity to engage, learn, and grow with like-minded individuals in the field.
                            </p>

                            <p class="event-details">
                                <strong>Details of the Event:</strong><br>
                                Zorphix is a national-level symposium conducted by the Computer Science and Business System department at Chennai Institute of Technology, Kundrathur. It is going to be held on 18th February 2025.
                            </p>

                            <div class="left-aligned">
                                <p class="event-details">
                                    <strong>Date:</strong><br>
                                    18th February 2025
                                </p>
                                
                                <p class="event-details">
                                    <strong>Venue:</strong><br>
                                    Chennai Institute of Technology, Kundrathur
                                </p>
                            </div>

                            <p class="event-details" style="text-align: center;">
                                Thank you for registering for this event! We look forward to your participation and hope you have a fruitful experience.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            © 2025 Zorphix Symposium | Chennai Institute of Technology
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;


