const express = require("express");
const router = express.Router();
const {
  createTask,
  getTimelyTasksSummary,
} = require("../controllers/Tasks.controller");
const authMiddleware = require("../middleware/auth");
const { getTaskSummary } = require("../controllers/GetTaskSummary.controller");

router.post("/createTask", authMiddleware, createTask);
router.get("/taskSummary", authMiddleware, getTaskSummary);
router.get("/timetask", authMiddleware, getTimelyTasksSummary);
module.exports = router;
