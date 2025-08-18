import * as fs from "node:fs/promises";
import path from "node:path";
import mail from "../helpers/mail.js";
import { Jimp } from "jimp";
import User from "../models/user.js";

async function getAvatar(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.avatarURL === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }
    res.sendFile(path.resolve("public/avatars", user.avatarURL));
  } catch (error) {
    next(error);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    const originalPath = req.file.path;

    // const newPath = path.resolve("public", req.file.filename);

    const avatar = await Jimp.read(originalPath);

    avatar.resize({ w: 250, h: 250 });

    const savePath = path.resolve("public/avatars", req.file.filename);

    await avatar.write(savePath);
    await fs.unlink(originalPath);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    );

    if (user === null) {
      return res.status(401).send({ message: "Not authorized" });
    }

    res.status(200).send(user.avatarURL);
  } catch (error) {
    next(error);
  }
}

async function verifyMail(req, res, next) {
  const { verificationToken } = req.params;
  // console.log("🚀 ~ verifyMail ~ verificationToken:", verificationToken);
  try {
    const user = await User.findOne({ verificationToken });

    await User.findOneAndUpdate(
      { verificationToken },
      {
        verify: true,
        verificationToken: null,
      },
      { new: true }
    );

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

async function resendingVerifyMail(req, res, next) {
  const { email } = req.body;
  const emailInLowerCase = email.toLowerCase();
  try {
    const user = await User.findOne({ email: emailInLowerCase });

    const { verificationToken } = user;

    if (user.verify === true) {
      return res
        .status(400)
        .send({ message: "Verification has already been passed" });
    }

    const message = {
      to: emailInLowerCase,
      from: "contactBooks@gmail.com",
      subject: "From Node.js resend verify mail",
      html: `<h1 style="color: red">Hello, I am Node, I am Node.js</h1>
        <a href="http://localhost:3000/api/users/verify/${verificationToken}">Follow the link to verify your email</a>`,
      text: `Hello, I am Node, I am Node.js. Follow the link to verify your email http://localhost:3000/api/users/verify/${verificationToken}`,
    };

    await mail
      .sendMail(message)
      .then((info) => console.log(info))
      .catch((err) => console.log(err));

    res.status(200).send({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}

export default { uploadAvatar, getAvatar, verifyMail, resendingVerifyMail };
