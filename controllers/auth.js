import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import mail from "../helpers/mail.js";
import gravatar from "gravatar";

async function register(req, res, next) {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();

  const verificationToken = crypto.randomUUID();
  const message = {
    to: emailInLowerCase,
    from: "contactBooks@gmail.com",
    subject: "From Node.js",
    html: `<h1 style="color: red">Hello, I am Node, I am Node.js</h1>
        <a href="http://localhost:3000/api/users/verify/${verificationToken}">Follow the link to verify your email</a>`,
    text: `Hello, I am Node, I am Node.js. Follow the link to verify your email http://localhost:3000/api/users/verify/${verificationToken}`,
  };

  await mail
    .sendMail(message)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));

  try {
    const user = await User.findOne({ email: emailInLowerCase });
    if (user !== null) return next(HttpError(409, "Email in use"));
    const avatarURL = gravatar.url(email);
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: emailInLowerCase,
      password: passwordHash,
      avatarURL,
      verificationToken,
    });

    const resRegister = {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    };
    res.status(201).send(resRegister);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();
  try {
    const user = await User.findOne({ email: emailInLowerCase });
    if (user === null) {
      return next(HttpError(401, "Email or password is wrong"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return next(HttpError(401, "Email or password is wrong"));
    }

    if (user.verify === false) {
      return res.status(401).send({ message: "Please verify your email." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    await User.findByIdAndUpdate(user._id, { token });
    const resLogin = {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };

    res.send(resLogin);
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) return next(HttpError(401, "Not authorized"));

    const resCurrent = {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };

    res.status(200).send(resCurrent);
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { token: null });

    if (user === null) return next(HttpError(401, "Not authorized"));

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function updateSubscription(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(HttpError(400, "Subscription must be provided"));
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { subscription: req.body.subscription },
      { new: true }
    );

    if (!user) {
      return next(HttpError(404, "User not found"));
    }

    const responseUser = {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };
    res.status(200).send(responseUser);
  } catch (error) {
    next(HttpError(400, "Invalid subscription value"));
  }
}

export default { register, login, current, logout, updateSubscription };
