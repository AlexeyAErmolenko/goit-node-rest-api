import { Jimp } from "jimp";
import * as fs from "node:fs/promises";
import path from "node:path";

async function resizeAvatar(req, res, next) {
  try {
    const originalPath = req.file.path;
    console.log("🚀 ~ resizeAvatar ~ req.file.path:", req.file.path);
    // console.log("🚀 ~ resizeAvatar ~ req.file:", req.file);

    const newPath = path.resolve("public/avatars", req.file.filename);
    console.log("🚀 ~ resizeAvatar ~ newPath:", newPath);

    const avatar = await Jimp.read(originalPath);
    console.log("🚀 ~ resizeAvatar ~ avatar:", avatar.bitmap.width);

    avatar.resize({ width: 250, height: 250 });

    await avatar.write(newPath);
    await fs.unlink(originalPath);

    req.file.path = newPath;

    console.log("Зображення успішно змінено та збережено");
    next();

    // // const avatar = await Jimp.read(req.file.path);
    // console.log("🚀 ~ resizeAvatar ~ req.file.path:", req.file.path);
    // console.log("🚀 ~ resizeAvatar ~ avatar:", avatar);
    // // avatar.resize(250, 250);
    // await avatar.writeAsync(req.file.path);
    // console.log("Изображение успешно изменено");
    // next();
  } catch (err) {
    console.error("Ошибка при изменении размера:", err);
  }
}

export default resizeAvatar;
