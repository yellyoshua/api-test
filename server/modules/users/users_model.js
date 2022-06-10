import mongoose from "mongoose";
import model from "../core/model.js";

const usersSchema = new mongoose.Schema({
  username: String,
  email: String,
}, { collection: "users"});

const users = mongoose.model("users", usersSchema);

export default model(users);
