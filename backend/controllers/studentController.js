import asyncHandler from 'express-async-handler';
import Student from '../models/student.js';
import gravatar from 'gravatar';

const getStudents = asyncHandler(async (req, res) => {
    const{companyId} = req.params;
    const students = await Student.find({company: companyId}).populate('company');
    res.status(200).json(students ? students : []);
})

const getStudent =  asyncHandler(async (req, res) => {
    const{id} = req.params;
    const student = await Student.findById(id).populate('company');
    res.status(200).json(student? student : null);
})

const createStudent =  asyncHandler(async (req, res) => {
    const{
        firstName,
        lastName,
        teacher,
        homeroomNumber,
        email,
        company, // CompanyId
        grade, 
        profileImage, 
        gender, 
        carTag, 
        schoolIssuedId
    } = req.body;
    const student = await Student.create({
        firstName,
        lastName,
        teacher,
        homeroomNumber,
        company,
        grade, 
        profileImage: profileImage ? profileImage : gravatar.url(email, { s: '300', r: 'x', d: 'wavatar' }), 
        gender, 
        carTag, 
        schoolIssuedId
    });
    if(!student) {
        res.status(400);
        throw new Error('Student Could not be added.')
    }
    res.status(200).json(student? student : null);
});
export {
    getStudents,
    getStudent,
    createStudent
}