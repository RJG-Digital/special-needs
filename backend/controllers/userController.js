import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import gravatar from 'gravatar';
import {sendMail} from '../config/mailer.js';

/**
 * @description Register User
 * @route       POST/api/users
 * @access      Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, companyId, privilegeIds, studentIds } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields')
    }
    //  Check if user exsists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create User
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        company: companyId ? companyId : null,
        privilegeIds: privilegeIds ? privilegeIds: [],
        studentIds: studentIds ? studentIds : [],
        profileImage: gravatar.url(email, { s: '300', r: 'g', d: 'robohash' })
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.profileImage,
            plaidItems: user.plaidItems,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user Data');
    }
});

/**
 * @description Authenticate User
 * @route       POST/api/users/login
 * @access      Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('company');
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            company: user.company,
            profileImage: user.profileImage,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
    await bcrypt.compare(password, user.password);
});

/**
 * @description Get current logged in user
 * @route       GET/api/users/me
 * @access      Private
 */
const getMe = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email, profileImage, } = await User.findById(req.user.id);
    res.status(200).json({
        _id,
        firstName,
        lastName,
        email,
        profileImage,
        token: req.user.token
    });
});

/**
 * @description Sends a link with token to reset password
 * @route       POST/api/users/forgotpassword
 * @access      Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});
    if(user) {
        const token = generateResetToken(user._id);
        sendMail(user.email, 'Password Reset',`http://localhost:4200/auth/resetpassword/${token}`);
    }
    res.status(200).json({msg: 'Success'})
});

/**
 * @description reset password on user from token
 * @route       POST/api/users/resetpassword
 * @access      Public
 */
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
     // Hash Password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findByIdAndUpdate(req.user._id, {password: hashedPassword});
    if(user) {
        res.status(200).json({msg: 'Success'})
    } else {
        res.status(400);
        throw new Error('Something went wrong.');
    }

});

/**
 * @description Get current logged in user
 * @route       GET/api/users/me
 * @access      Private
 */
const test = asyncHandler(async (req, res) => {

    res.status(200).json({
        msg: 'this worked like a charm'
    });
});

const updateUserInfo = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body;
    if (email !== req.user.email) {
        // trying to change email
        const userExists = await User.findOne({ email });
        if (userExists && userExists._id !== req.user.id) {
            res.status(400);
            throw new Error('User already exists.');
        }
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body);
    res.status(200).json({
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage
    });
});

const updateUserImage = asyncHandler(async (req, res) => {

});

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

const generateResetToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

/**
 * @description Register Fist User of a company
 * @route       POST/api/users/registerfirstuser
 * @access      Public
 */
const registerFirstUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, company, role, title } = req.body;
    console.log('password: ', password);
    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields')
    }
    //  Check if user exsists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create User
    const user = await User.create({
        firstName,
        lastName,
        email,
        title,
        password: hashedPassword,
        company: company ? company : null,// companyid
        role,
        profileImage: gravatar.url(email, { s: '300', r: 'x', d: 'retro' })
    });
    if (user) {
        const token =  generateToken(user._id);
       const sent = await sendMail(user.email, 'New Account Created', `A new Account has been created for you. Here is your temperary password. Use it to log in the first time to reset your password. Link: http://localhost:4200/resetpassword/${token} Password: ${password}`);
        console.log(sent);
       res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            title: user.title,
            profileImage: user.profileImage,
            company: user.company,
            role: user.role,
            token
        });
    } else {
        res.status(400);
        throw new Error('Invalid user Data');
    }
});

/**
 * @description Register Fist User of a company
 * @route       POST/api/users/registerfirstuser
 * @access      Public
 */
const getUsersByCompany = asyncHandler(async (req, res) => {
    const {companyId} = req.params;
    if(companyId) {
        let users = await User.find({company: companyId}).populate('company');
        console.log(users);
        users = users.map(u => {
            const {_id, firstName, lastName, email, profileImage, title, role, company} = u
            let fullRoll = company.userRoles.find(r => r.number === role)
            return {
                _id,
                firstName,
                lastName,
                email,
                title,
                profileImage,
                role: fullRoll,
                company
            }
        })
        res.status(200).json(users);
    }else {
        res.status(404);
        throw new Error('Company Not Found');
    }
});


export {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword,
    test,
    registerFirstUser,
    getUsersByCompany
}