import mongoose from "mongoose";
import model from "../core/model.js";

const studentsSchema = new mongoose.Schema({
  grade: String,
  age: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  }
}, { collection: "students", strictQuery: false });

const students = mongoose.model("students", studentsSchema);

export default model(students);
