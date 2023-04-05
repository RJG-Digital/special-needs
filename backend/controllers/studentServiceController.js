import asyncHandler from "express-async-handler";
import StudentService from "../models/studentService.js";

const getServices = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const studentService = await StudentService.find({ student: studentId })
    .populate("service")
    .populate("user");
  res.status(200).json(studentService ? studentService : []);
});

const upsetService = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  let service;
  if (_id) {
    service = await StudentService.findByIdAndUpdate(_id, req.body);
    res.status(200).json(service);
  } else {
    service = await StudentService.create({...req.body});
    res.status(200).json(service);
  }
});

export {getServices, upsetService};