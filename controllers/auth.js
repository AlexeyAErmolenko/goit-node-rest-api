import bcrypt from "bcrypt";
import User from "../models/user.js";

async function register(req, res, next) {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();
  try {
    const user = await User.findOne({ email: emailInLowerCase });
    if (user !== null)
      return res.status(409).send({ message: "User already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      email: emailInLowerCase,
      password: passwordHash,
    });
    res.status(201).send({ message: "Registration successfully" });
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
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
      // .send({ message: "Email is incorrect" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
      // .send({ message: "Password is incorrect" })
    }

    res.send({ token: "Token!" });
  } catch (error) {
    next(error);
  }
}
export default { register, login };
