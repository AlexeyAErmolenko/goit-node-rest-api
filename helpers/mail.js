import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    // user: process.env.MAILER_USERNAME,
    // pass: process.env.MAILER_PASSWORD,
    user: "be1e9f8eeb6bb6",
    pass: "3d728cffede55f",
  },
});

const sendMail = (message) => {
  return transport.sendMail(message);
};
export default { sendMail };

// const emailInLowerCase = "emailInLowerCase@gmail.com";
// const verificationToken = "2134-123123-142124-13123";
// const message = {
//   to: emailInLowerCase,
//   from: "mongoDB@gmail.com",
//   subject: "From Node.js",
//   html: `<h1 style="color: red">Hello, I am Node, I am Node.js</h1>
//       <a href="http://localhost:3000/api/users/verify/${verificationToken}">Follow the link to verify your email</a>`,
//   text: `Hello, I am Node, I am Node.js. Follow the link to verify your email http://localhost:3000/api/users/verify/${verificationToken}`,
// };
// console.log("🚀 ~ register ~ message:", message);
// mail.send(message);
