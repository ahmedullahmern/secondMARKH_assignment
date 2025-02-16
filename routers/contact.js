import express from 'express'
import Contact from '../models/contact.js';
import nodemailer from "nodemailer";

const router = express.Router();

router.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contact = new Contact({ name, email, message });
        await contact.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `Message: ${message}\n\nFrom: ${name}\nEmail: ${email}`,
        };



        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
});

export default router;
