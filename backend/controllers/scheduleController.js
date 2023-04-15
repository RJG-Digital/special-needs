import asyncHandler from "express-async-handler";
import Schedule from "../models/schedule.js";

const getSchedules = asyncHandler(async (req, res) => {
  const { company } = req.user;
  const schedules = await Schedule.find({ company: company })
    .populate("user")
    .populate("company");
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
  const schedule = await Schedule.find({ user: userId }).populate("user");
  res.status(200).json(schedule ? schedule : null);
});

const createSchedule = asyncHandler(async (req, res) => {
  let schedule = {...req.body, company: req.user.company};
  schedule = await Schedule.create(schedule);
  res.status(200).json(schedule ? schedule : null);
});

const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const schedule = await Schedule.findByIdAndUpdate(id, req.body);
  res.status(200).json(schedule ? schedule : null);
});

const getStudentSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
    const { company } = req.user;
    const schedules = await Schedule.find({ company });
    if (schedules && schedules.length) {
      const allUserEvents = schedules
        .flatMap((s) => s.calenderEvents)
        .filter((ce) => ce.Student.toString() === id);
        if(allUserEvents) {
          const studentSchedule = {
            user: null,
            company,
            name: `Schedule`,
            description: '',
            calenderEvents: allUserEvents
          }
          res.status(200).json(studentSchedule ? studentSchedule : null);
        }
    }
});

export {
  getSchedules,
  getSchedule,
  createSchedule,
  getMySchedules,
  getUserSchedules,
  updateSchedule,
  getStudentSchedule,
};
