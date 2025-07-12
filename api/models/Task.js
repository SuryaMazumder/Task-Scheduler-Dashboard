const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: String,
    type: {
      type: String,
      enum: ["Task", "Meeting", "Reminder"],
      default: "Task",
    },
    color: { type: String, default: "blue" },
    notes: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional user relation
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "done", "overdue"],
      default: "pending",
    },
    repeat: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
    },
    reminders: [Number], // minutes before start (5, 15, 30, etc.)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
