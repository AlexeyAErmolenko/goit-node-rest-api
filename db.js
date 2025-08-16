import mongoose from "mongoose";
import { app } from "./app.js";

mongoose.set("strictQuery", false);

const DB_URI = process.env.DB_URI;

async function main() {
  try {
    mongoose.connect(DB_URI);
    console.log("Database connection successful");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("Server is running. Use our API on port: ", PORT);
    });
  } catch (error) {
    console.error("main failed:", error.message);
  }
}

main();

// mongoose
//   .connect(DB_URI)
//   .then(() => {
//     console.log("Database connection successful");
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
