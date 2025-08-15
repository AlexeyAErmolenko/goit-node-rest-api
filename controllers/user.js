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
    console.log("🚀 ~ uploadAvatar ~ req.file.path:", req.file.path);

    const newPath = path.resolve("public", req.file.filename);
    console.log("🚀 ~ resizeAvatar ~ newPath:", newPath);

    const avatar = await Jimp.read(originalPath);
    console.log(
      "🚀 ~ resizeAvatar ~ avatar.bitmap.width:",
      avatar.bitmap.width
    );

    avatar.resize({ width: 250, height: 250 });

    await fs.rename(originalPath, newPath);
    // await avatar.write(newPath);
    // await fs.unlink(originalPath);

    // req.file.path = newPath;

    // console.log("Зображення успішно змінено");

    const savePath = path.resolve("public/avatars", req.file.filename);

    console.log("🚀 ~ uploadAvatar ~ savePath:", savePath);

    await fs.rename(newPath, savePath);

    console.log("🚀 ~ uploadAvatar - Rename ok");

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    );

    console.log("🚀 ~ uploadAvatar - Update base ok");

    if (user === null) {
      return res.status(401).send({ message: "Not authorized" });
    }

    console.log("🚀 ~ uploadAvatar - User update ok");

    res.status(200).send(user.avatarURL);
  } catch (error) {
    next(error);
  }
}

export default { uploadAvatar, getAvatar };
