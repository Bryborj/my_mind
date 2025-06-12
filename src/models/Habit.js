// models/Habit.js
import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  frequency: { type: String }, // diaria, semanal, etc.
  createdAt: { type: Date, default: Date.now },
  completedDates: { type: [String], default: [] }, // array de fechas completadas en formato 'YYYY-MM-DD'
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});

export default mongoose.models.Habit || mongoose.model("Habit", HabitSchema);
