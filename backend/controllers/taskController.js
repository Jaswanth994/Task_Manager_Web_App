const Task = require('../models/Task');

// GET all tasks for a user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(tasks);
};

// POST create task
exports.createTask = async (req, res) => {
  const { title, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const task = await Task.create({ title, dueDate, user: req.user });
  res.status(201).json(task);
};

// DELETE a task
exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: 'Task deleted' });
};

// TOGGLE task status
exports.toggleTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
};

// EDIT task title
exports.editTask = async (req, res) => {
  const { title } = req.body;
  const task = await Task.findOne({ _id: req.params.id, user: req.user });
  task.title = title;
  await task.save();
  res.json(task);
};
