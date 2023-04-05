import asyncHandler from "express-async-handler";
import Student from "../models/student.js";
import gravatar from "gravatar";

const getStudents = asyncHandler(async (req, res) => {
  const { companyId } = req.params;
  const students = await Student.find({ company: companyId }).populate(
    "company"
  );
  res.status(200).json(students ? students : []);
});

const getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).populate("company").populate('services');
  res.status(200).json(student ? student : null);
});

const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body);
  res.status(200).json(student ? student : null);
});

const createStudent = asyncHandler(async (req, res) => {
  const {
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
    schoolIssuedId,
  } = req.body;
  const student = await Student.create({
    firstName,
    lastName,
    teacher,
    homeroomNumber,
    company,
    grade,
    email,
    profileImage: profileImage
      ? profileImage
      : gravatar.url(email, { s: "300", r: "x", d: "wavatar" }),
    gender,
    carTag,
    schoolIssuedId,
  });
  if (!student) {
    res.status(400);
    throw new Error("Student Could not be added.");
  }
  res.status(200).json(student ? student : null);
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const students = await Student.findByIdAndDelete(id);
  res.status(200).json(students ? students : []);
});

const updateStudentServices = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const newServiceData = req.body;
  let foundStudent = await Student.findById(_id);
  if(foundStudent) {
    const servicesToAssign = newServiceData.filter(s => s.assigned);
    if(servicesToAssign) {
      foundStudent.services = servicesToAssign.map(s => {
        return {
          service: s.serviceId,
          minutesAssigned: s.minutesAssigned,
          minutesLeft: s.minutesLeft,
          minutesUsed: s.minutesUsed,
        }
      })
      console.log(foundStudent);
      foundStudent = await Student.findByIdAndUpdate(_id, foundStudent);
      res.status(200).json(foundStudent);
    }
   
  }
});

export {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  updateStudentServices,
};
