import * as fs from "node:fs/promises";
import path from "node:path";

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

    const newPath = path.resolve("public", req.file.filename);

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

export default { uploadAvatar, getAvatar };
