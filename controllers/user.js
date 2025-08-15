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
    console.log("🚀 ~ uploadAvatar Bye1");
    const image = await Jimp.read(req.file.path);
    console.log("🚀 ~ uploadAvatar ~ image.bitmap.width:", image.bitmap.width);
    // image.cover(options: {250, 250 });
    await image.write(req.file.path);
    console.log("🚀 ~ uploadAvatar Bye2");
    await fs.rename(
      req.file.path,
      path.resolve("public/avatars", req.file.filename)
    );
    console.log("🚀 ~ uploadAvatar Bye3");
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    );
    console.log("🚀 ~ uploadAvatar Bye4");
    if (user === null) {
      return res.status(401).send({ message: "Not authorized" });
    }
    console.log("🚀 ~ uploadAvatar Bye5");
    res.status(200).send(user.avatarURL);
  } catch (error) {
    next(error);
  }
}

export default { uploadAvatar, getAvatar };
