import asyncHandler from 'express-async-handler';
import Company from '../models/company.js';

const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find({});
    res.status(200).json(companies? companies : []);
})
const createCompany = asyncHandler(async (req, res) => {
    const { name, logo } = req.body;
    const company = await Company.create({name, logo});
    res.status(201).json(company)
})

export {
    getCompanies,
    createCompany
}
//Acadiana Renaissance Charter Academy
//https://home.acadianacharter.org/pics/header-logo.png