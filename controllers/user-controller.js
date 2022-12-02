import User from "../model/user";
import bcrypt from "bcryptjs";
import Goal from "../model/goal";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exist, login" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    tasks: [],
    goals: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  // const defaultGoal = new Goal({
  //   title: "default goal",
  //   description: "default goal",
  //   isMainGoal: false,
  //   isCompleted: false,
  //   reward: "default",
  //   user: user._id,
  //   tasks: [],
  // });

  try {
    // await defaultGoal.save();
    // user.goals.push(defaultGoal);
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "User with this email does not exist" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  return res
    .status(200)
    .json({ message: "Login successfull", user: existingUser });
};
