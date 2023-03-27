import asyncHandler from 'express-async-handler';
import Privilege from '../models/privilege.js';

const createPrivilege = asyncHandler(async (req, res) => {
    const { name, number } = req.body;
    const priv = await Privilege.create({
        name, 
        number
    })
    res.status(201).json(priv);
})

const getPrivileges = asyncHandler(async (req, res) => {
    const privs = await Privilege.find({});
    res.status(201).json(privs);
})

export {createPrivilege, getPrivileges}