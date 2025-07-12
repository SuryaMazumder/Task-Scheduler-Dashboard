const Task = require("../models/Task");
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      type,
      color,
      notes,
      startTime,
      endTime,
      assignedTo,
      repeat,
      reminders,
    } = req.body;

    if (!title || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "Title, startTime, and endTime are required." });
    }

    const task = new Task({
      title,
      description: notes,
      company,
      type: type || "Task",
      color: color || "blue",
      notes,
      startTime,
      endTime,
      assignedTo,
      repeat: repeat || "none",
      reminders: reminders || [],
      createdBy: req.user._id, // Set user from token
    });
    console.log("Creating task:", task);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Task creation error:", err);
    res
      .status(500)
      .json({ message: "Task creation failed", error: err.message });
  }
};

exports.getTimelyTasksSummary = async (req, res) => {
  try {
    const date = req.query.date;
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);

    const tasks = await Task.find({
      startTime: { $gte: start, $lte: end },
    });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching timely tasks summary:", err);
    res.status(500).json({
      message: "Failed to fetch timely tasks summary",
      error: err.message,
    });
  }
};
