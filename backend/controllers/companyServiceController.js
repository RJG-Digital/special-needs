import asyncHandler from "express-async-handler";
import CompanyService from "../models/companyService.js";
const getServices = asyncHandler(async (req, res) => {
  const{company} = req.user
  const companyServices = await CompanyService.find({company}).populate("company");
  res.status(200).json(companyServices ? companyServices : []);
});

const getService = asyncHandler(async (req, res) => {
  const{id} = req.params;
  const companyServices = await CompanyService.findById(id).populate("company");
  res.status(200).json(companyServices ? companyServices : []);
});

const createService = asyncHandler(async (req, res) => {
  const service = {
    ...req.body,
    company: req.user.company,
  };
  const companyService = await CompanyService.create(service);
  res.status(200).json(companyService ? companyService : []);
});

export { getServices, getService, createService };
