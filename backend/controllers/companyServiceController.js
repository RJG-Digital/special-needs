import asyncHandler from 'express-async-handler';
import CompanyService from '../models/companyService.js';
const getServices = asyncHandler(async (req, res) => {
    const schedules = await CompanyService.find({}).populate("user");
    res.status(200).json(schedules ? schedules : []);
  });
  const getService = asyncHandler(async (req, res) => {
    const schedules = await CompanyService.find({}).populate("user");
    res.status(200).json(schedules ? schedules : []);
  });
  const createService = asyncHandler(async (req, res) => {
    const schedules = await CompanyService.find({}).populate("user");
    res.status(200).json(schedules ? schedules : []);
  });
export {getServices, getService, createService}