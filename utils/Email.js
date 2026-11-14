import nodemailer from "nodemailer";


/*
{
    to: "alice@example.com, bob@example.com", // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // HTML body
  }
*/

const emailSender = async (body)=>{
try {
  const transporter =  nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });


    await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        ...body
    });

    console.log("Email sent successfully");
    
} catch (error) {
    console.log(error.message);
    throw error.message;
}
}

export default emailSender;