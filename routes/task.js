const express = require("express");
const { loginRequired, ensureCorrectUser } = require("../middlewares/auth");
const {
  getTasks,
  addTask,
  removeTask,
  setComplete,
} = require("../handlers/task");
const router = express.Router();

router
  .route("/:id")
  .get(loginRequired, ensureCorrectUser, getTasks)
  .post(loginRequired, ensureCorrectUser, addTask);
router.delete("/:id2", removeTask);
router.post("/complete/:id2", setComplete);

module.exports = router;
