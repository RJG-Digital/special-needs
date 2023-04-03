import asyncHandler from "express-async-handler";
import Schedule from "../models/schedule.js";

const getSchedules = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find({}).populate("user");
  res.status(200).json(schedules ? schedules : []);
});

const getMySchedules = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const schedule = await Schedule.find({ user: _id }).populate("user");
  res.status(200).json(schedule ? schedule : null);
});

const getSchedule = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const schedule = await Schedule.findById(_id).populate("user");
  res.status(200).json(schedule ? schedule : null);
});

const getUserSchedules = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const schedule = await Schedule.find({user: userId}).populate("user");
  res.status(200).json(schedule ? schedule : null);
});

const createSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.create(req.body);
  res.status(200).json(schedule ? schedule : null);
});

const updateSchedule = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const schedule = await Schedule.findByIdAndUpdate(id, req.body);
  res.status(200).json(schedule ? schedule : null);
});

export {
  getSchedules,
  getSchedule,
  createSchedule,
  getMySchedules,
  getUserSchedules,
  updateSchedule
};
