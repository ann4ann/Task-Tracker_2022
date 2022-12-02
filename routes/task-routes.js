import express from "express";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getByGoalId,
  getById,
  getByUserId,
  updateTask,
} from "../controllers/task-controller";

const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/add", addTask);
taskRouter.put("/update/:id", updateTask);
taskRouter.get("/:id", getById);
taskRouter.delete("/:id", deleteTask);
taskRouter.get("/user/:id", getByUserId);
taskRouter.get("/goal/:id", getByGoalId);

export default taskRouter;
