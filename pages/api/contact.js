import nodemailer from "nodemailer";

export default async function contact(req, res) {
    console.log('here contact js');
    let user = process.env.user;
    console.log('user ' + user);
    let pass = process.env.password;
    console.log('pass ' + pass);
    const {name, email, message} = req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: pass
        }
    });
    let messageConfig = {
        from: user,
        to: user,
        subject: `Website enquiry from ${name}`,
        replyTo: email,
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>`
    }
    try {
        await transporter.sendMail(messageConfig);
        return res.status(200).json({message: 'success'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Could not send the email. Your message was not sent."
        })
    }

}