const express = require("express");
const { loginRequired, ensureCorrectUser } = require("../middlewares/auth");
const {
  getTasks,
  addTask,
  removeTask,
  setComplete,
  addNotes,
} = require("../handlers/task");
const router = express.Router();

router
  .route("/:id")
  .get(loginRequired, ensureCorrectUser, getTasks)
  .post(loginRequired, ensureCorrectUser, addTask);
router.delete("/:id/:id2", loginRequired, ensureCorrectUser, removeTask);
router.post("/:id/complete/:id2", loginRequired, ensureCorrectUser, setComplete);
router.post("/:id/notes/id2", loginRequired, ensureCorrectUser, addNotes);

module.exports = router;
