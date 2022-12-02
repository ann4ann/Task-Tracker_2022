import express from "express";
import { getAllUsers, login, signup } from "../controllers/user-controller";

const router = express.Router();

// method endpoint controller(функция)
//      ↓   ↓        ↓
router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);

export default router;
