import express from "express";
import {
  addGoal,
  deleteGoal,
  getAllGoals,
  getById,
  getByUserId,
  updateGoal,
} from "../controllers/goal-controller";

const goalRouter = express.Router();

goalRouter.get("/", getAllGoals);
goalRouter.post("/add", addGoal);
goalRouter.put("/update/:id", updateGoal);
goalRouter.get("/:id", getById);
goalRouter.delete("/:id", deleteGoal);
goalRouter.get("/user/:id", getByUserId)

export default goalRouter;
