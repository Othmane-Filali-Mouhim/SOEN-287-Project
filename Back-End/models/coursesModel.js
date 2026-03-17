import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseCode: String,
  name: String,
  term: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: true },
  // Instead of a separate Enrollment collection, store enrolled students here
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export const Course = mongoose.model("Course", courseSchema);