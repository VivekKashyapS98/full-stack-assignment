const db = require("../models");

exports.getTasks = async function (req, res, next) {
  await db.User.findById(req.params.id)
    .then((data) => {
      console.log(req.params);
      res.status(200).json([...data.tasks]);
    })
    .catch((err) => next(err));
};

exports.addTask = async function (req, res, next) {
  try {
    let user = await db.User.findById(req.params.id);
    console.log(req.params);
    user.tasks.push(req.body);
    await user.save();
    return res.status(200).json({ message: "Task Added!" });
  } catch (err) {
    next(err);
  }
};

exports.removeTask = async function (req, res, next) {
  try {
    let user = await db.User.findById(req.params.id);
    user.tasks = user.tasks.filter((task) => task.id !== req.params.id2);
    await user.save();
    return res.status(200).json({ message: "Task Deleted!" });
  } catch (err) {
    next(err);
  }
};

exports.setComplete = async function (req, res, next) {
  try {
    await db.User.findOneAndUpdate( { _id: req.params.id, 'tasks._id': req.params.id2 }, { $set: {
      'tasks.$.completedAt': req.body.completedAt
    }}).then(data => res.status(200).json({message: data}))
       .catch(err => next(err));
  } catch (err) {
    next(err);
  }
};

exports.addNotes = async function (req, res, next) {
  try {
    await db.User.findOneAndUpdate( { _id: req.params.id, 'tasks._id': req.params.id2 }, { $push: {
      'tasks.$.notes': req.body.note
    }}).then(data => res.status(200).json({message: data}))
       .catch(err => next(err));
  } catch (err) {
    next(err);
  }
};
