const express = require("express");
const {
  getTasks,
  addTask,
  removeTask,
  setComplete,
} = require("../handlers/task");
const router = express.Router();

router.route("/").get(getTasks).post(addTask);
router.delete("/:id2", removeTask);
router.post("/complete/:id2", setComplete);

module.exports = router;
