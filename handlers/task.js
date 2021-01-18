const db = require("../models");

exports.getTasks = async function (req, res) {
  await db.User.findById(req.params.id)
    .then((data) => res.status(200).json([...data.tasks]))
    .catch((err) => next(err));
};

exports.addTask = async function (req, res) {
  try {
    let user = await db.User.findById(req.params.id);
    user.tasks.push(req.body);
    await user.save();
    return res.status(200).json({ message: "Task Added!" });
  } catch (err) {
    next(err);
  }
};

exports.removeTask = async function (req, res) {
  try {
    let user = await db.User.findById(req.params.id);
    user.tasks = user.tasks.filter((task) => task.id !== req.params.id2);
    await user.save();
    return res.status(200).json({ message: "Task Deleted!" });
  } catch (err) {
    next(err);
  }
};

exports.setComplete = async function (req, res) {
  try {
    let user = await db.User.findById(req.params.id);
    user.tasks = user.tasks.map((task) => {
      if (task.id === req.params.id2) {
        return { completedAt: req.body.completedAt, ...task };
      } else return task;
    });
    await user.save();
    return res.status(200).json({ message: "Task Completed!" });
  } catch (err) {
    next(err);
  }
};

exports.addNotes = async function (req, res) {
  try {
    let user = await db.User.findById(req.params.id);
    user.tasks = user.tasks.map((task) => {
      if (task.id === req.params.id2) {
        return { notes: [req.body.note, ...task.notes], ...task };
      } else return task;
    });
    await user.save();
    return res.status(200).json({ message: "Notes Added!" });
  } catch (err) {
    next(err);
  }
};
