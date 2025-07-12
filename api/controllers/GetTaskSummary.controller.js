// controllers/taskController.js
const Task = require("../models/Task");
exports.getTaskSummary = async (req, res) => {
  const userId = req.user._id;
  console.log("Fetching task summary for user:", userId);
  try {
    const myTasks = await Task.countDocuments({ createdBy: userId });
    const delegatedTasks = await Task.countDocuments({ assignedTo: userId });
    const meetings = await Task.countDocuments({
      createdBy: userId,
      type: "Task",
    });
    console.log("Task summary:", {
      myTasks,
      delegatedTasks,
      meetings,
    });
    res.json({
      myTasks,
      delegatedTasks,
      meetings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch task summary", error: err.message });
  }
};
