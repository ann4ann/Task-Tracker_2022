import mongoose from "mongoose";
import Task from "../model/task";
import User from "../model/user";
import Goal from "../model/goal";

export const getAllTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find();
  } catch (err) {
    console.log(err);
  }

  if (!tasks) {
    return res.status(404).json({ message: "No tasks found" });
  }
  return res.status(200).json({ tasks });
};

export const addTask = async (req, res, next) => {
  const {
    title,
    description,
    isImportant,
    isUrgent,
    deadline,
    estimatedDuration,
    user,
    goal,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }

  let existingGoal;
  try {
    existingGoal = await Goal.findById(goal);
  } catch (err) {
    return console.log(err);
  }

  const task = new Task({
    title,
    description,
    // isCompleted: false,
    isImportant,
    isUrgent,
    deadline,
    estimatedDuration,
    user,
    goal,
  });
  try {
    // await task.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    // await task.save({ session });
    // existingUser.tasks.push(task);
    // await existingUser.save({ session });
    await task.save();
    existingUser.tasks.push(task);
    await existingUser.save();
    if (existingGoal) {
      existingGoal.tasks.push(task);
      await existingGoal.save();
    }
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ task });
};

export const updateTask = async (req, res, next) => {
  const {
    title,
    description,
    isCompleted,
    isImportant,
    isUrgent,
    deadline,
    estimatedDuration,
    durationInWork,
    goal,
  } = req.body;
  const taskId = req.params.id;

  let task;
  let nextGoal;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    task = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      isCompleted,
      isImportant,
      isUrgent,
      deadline,
      estimatedDuration,
      durationInWork,
      goal,
    }).populate("goal");
    await task.goal.tasks.pull(taskId);
    await task.goal.save();

    nextGoal = await Goal.findById(goal);
    if (nextGoal) {
      await nextGoal.tasks.push(taskId);
      await nextGoal.save();
    }
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  if (!task) {
    return res.status(500).json({ message: "Unable to update this task" });
  }
  // let prevGoal;
  // try {
  //   prevGoal = await Goal.findOne({ tasks: taskId });
  // } catch (err) {
  //   return console.log(err);
  // }
  return res.status(200).json({ task });
};

export const getById = async (req, res, next) => {
  const taskId = req.params.id;
  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    console.log(err);
  }
  if (!task) {
    return res.status(404).json({ message: "No task found" });
  }
  return res.status(200).json({ task });
};

export const deleteTask = async (req, res, next) => {
  const taskId = req.params.id;
  let task;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    task = await Task.findById(taskId).populate("goal");
    if (task.goal) {
      await task.goal.tasks.pull(task);
      await task.goal.save();
      task.depopulate("goal");
    }
    task = await Task.findByIdAndRemove(taskId).populate("user");
    await task.user.tasks.pull(task);
    await task.user.save();

    await session.commitTransaction();
  } catch (err) {
    // return res.status(500).json({ message: err });
    console.log(err);
  }
  if (!task) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully delete" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userTasks;
  try {
    userTasks = await User.findById(userId).populate("tasks");
  } catch (err) {
    console.log(err);
  }
  if (!userTasks) {
    return res.status(404).json({ message: "no tasks found" });
  }
  return res.status(200).json({ tasks: userTasks });
};

export const getByGoalId = async (req, res, next) => {
  const goalId = req.params.id;
  let goalTasks;
  try {
    goalTasks = await Goal.findById(goalId).populate("tasks");
  } catch (err) {
    console.log(err);
  }
  if (!goalTasks) {
    return res.status(404).json({ message: "no tasks found" });
  }
  return res.status(200).json({ tasks: goalTasks });
};
