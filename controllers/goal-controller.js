import mongoose from "mongoose";
import Goal from "../model/goal";
import User from "../model/user";
import Task from "../model/task";

export const getAllGoals = async (req, res, next) => {
  let goals;
  try {
    goals = await Goal.find();
  } catch (err) {
    console.log(err);
  }
  if (!goals) {
    return res.status(404).json({ message: "No goals found" });
  }
  return res.status(200).json({ goals });
};

export const addGoal = async (req, res, next) => {
  const { title, description, isMainGoal, reward, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }

  const goal = new Goal({
    title,
    description,
    isMainGoal,
    reward,
    user,
    tasks: [],
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await goal.save();
    existingUser.goals.push(goal);
    await existingUser.save();
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ goal });
};

export const updateGoal = async (req, res, next) => {
  const { title, description, isMainGoal, isCompleted, reward } = req.body;
  const goalId = req.params.id;
  let goal;
  try {
    goal = await Goal.findByIdAndUpdate(goalId, {
      title,
      description,
      isMainGoal,
      isCompleted,
      reward,
    });
  } catch (err) {
    console.log(err);
  }
  if (!goal) {
    return res.status(500).json({ message: "Unable to update goal" });
  }
  return res.status(200).json({ goal });
};

export const getById = async (req, res, next) => {
  const goalId = req.params.id;
  let goal;
  try {
    goal = await Goal.findById(goalId);
  } catch (err) {
    console.log(err);
  }
  if (!goal) {
    return res.status(404).json({ message: "no goals found" });
  }
  return res.status(200).json({ goal });
};

export const deleteGoal = async (req, res, next) => {
  const goalId = req.params.id;
  let goal;
  let tasksToUpdate;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    goal = await Goal.findByIdAndRemove(goalId).populate("user");
    tasksToUpdate = await Task.find({ goal: goalId });

    await goal.user.goals.pull(goal);
    await goal.user.save();

    if (tasksToUpdate) {
      await Task.updateMany({ goal: goalId }, { goal: null });
    }
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }
  if (!goal) {
    return res.status(500).json({ message: "unable to delete" });
  }

  try {
    tasksToUpdate = await Task.find({ goal: goalId });
  } catch (err) {
    return console.log(err);
  }

  return res.status(200).json({ message: "successfully deleted" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userGoals;
  try {
    userGoals = await User.findById(userId).populate("goals");
  } catch (err) {
    console.log(err);
  }
  if (!userGoals) {
    return res.status(404).json({ message: "no goals found" });
  }
  return res.status(200).json({ goals: userGoals });
};
