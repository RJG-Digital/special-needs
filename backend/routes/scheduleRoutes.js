import express from "express";
import {
  createSchedule,
  getSchedule,
  getSchedules,
  getMySchedules,
  getUserSchedules,
  updateSchedule,
  getStudentSchedule,
} from "../controllers/scheduleController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/", protect, createSchedule);
router.get("/", protect, getSchedules);
router.get("/me", protect, getMySchedules);
router.get("/:id", protect, getSchedule);
router.get("/student/:id", protect, getStudentSchedule);
router.put("/:id", protect, updateSchedule);
router.get("/user/:userId", protect, getUserSchedules);

export default router;
