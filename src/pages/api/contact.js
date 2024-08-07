import nodemailer from 'nodemailer';

// Define the async function and assign it to a variable
const contactHandler = async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'popcornbuddywebsite@gmail.com',
    subject: `New message from ${name} (${email})`,
    text: message,
  };

  try {
    // Send mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message.' });
  }
};

// Export the handler function as default
export default contactHandler;
