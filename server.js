import express from 'express';
import cors from "cors";
import nodemailer from "nodemailer";


const app = express()
const port = 3000
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

//send mail api 
app.post('/send-mail', async (req, res) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
        return res.status(400).json({ msg: "All fields required" })
    }

    try {
        //SMTP Exporter
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: "vernittyagi@gmail.com",
                pass: "xsmtpsib-55c19f75a629c93bea0ed06f86d8408b69833ff06ea78820a159f1856d645540-VtDM7blwz3m1kUfV"
            }
        })
        //Email body 
        const mailOptions = {
            from: "vernittyagi@gmail.com",
            to: "vernittyagi@gmail.com",
            subject: "New Contact Form Submission",
            html: `
                <h3>New Message from Portfolio contact form</h3>
                <p><strong>Name:</strong>${name}</p>
                <p><strong>Email:</strong>${email}</p>
                <p><strong>Message:</strong>${message}</p>
            `,
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, msg: "Email sent successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Error sending email" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
