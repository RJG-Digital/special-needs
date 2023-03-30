import asyncHandler from 'express-async-handler';
import Company from '../models/company.js';

const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find({});
    res.status(200).json(companies? companies : []);
})
const getCompany = asyncHandler(async (req, res) => {
    const {id} = req.params
    const company = await Company.findById(id);
    if(company) {
        res.status(200).json(company);
    } else {
        res.status(404);
        throw  new Error('Company not found.')
    }
})

const createCompany = asyncHandler(async (req, res) => {
    const { name, logo, colors, website } = req.body;
    const company = await Company.create({name, logo, colors, website});
    res.status(201).json(company)
})

export {
    getCompanies,
    getCompany,
    createCompany
}
//Acadiana Renaissance Charter Academy
//https://home.acadianacharter.org/pics/header-logo.png