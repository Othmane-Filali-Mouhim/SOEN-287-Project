import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isTemplate: { type: Boolean, default: false }, // true = instructor template, false = student assessment
  title: String,
  category: { type: String, enum: ["assignment", "lab", "quiz", "exam"] },
  weight: Number,
  earnedMarks: { type: Number, default: 0 },
  totalMarks: Number,
  dueDate: Date,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export const Assessment = mongoose.model("Assessment", assessmentSchema);