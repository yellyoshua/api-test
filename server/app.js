import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import users_routes from "./modules/users/users_routes.js";
import students_routes from "./modules/students/students_routes.js";

const app = express();

await mongoose.connect(process.env.DATABASE_URL);

app.listen(3000, () => {
  users_routes(app);
  students_routes(app);

  console.log("Start! http://localhost:3000");
});