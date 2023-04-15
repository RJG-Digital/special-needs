import asyncHandler from "express-async-handler";
import Student from "../models/student.js";
import gravatar from "gravatar";

const getStudents = asyncHandler(async (req, res) => {
  const { companyId } = req.params;
  const students = await Student.find({ company: companyId })
    .populate("company")
    .populate({
      path: "services",
      populate: {
        path: "service",
        model: "companyService",
      },
    });
  res.status(200).json(students ? students : []);
});

const getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id)
    .populate("company")
    .populate({
      path: "services",
      populate: {
        path: "service",
        model: "companyService",
      },
    });
  res.status(200).json(student ? student : null);
});

const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    teacher,
    email,
    homeroomNumber,
    grade,
    company,
    profileImage,
    gender,
    carTag,
    schoolIssuedId,
  } = req.body;
  const studentUpdate = {
    firstName,
    lastName,
    teacher,
    email,
    homeroomNumber,
    grade,
    company,
    profileImage,
    gender,
    carTag,
    schoolIssuedId,
  };
  const student = await Student.findByIdAndUpdate(id, { $set: studentUpdate });
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
    services: [],
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
  if (foundStudent) {
    const servicesToAssign = newServiceData.filter((s) => s.assigned);
    if (servicesToAssign) {
      foundStudent.services = servicesToAssign.map((s) => {
        return {
          service: s.serviceId,
          minutesAssigned: s.minutesAssigned,
          minutesLeft: s.minutesLeft,
          minutesUsed: s.minutesUsed,
        };
      });
      foundStudent = await Student.findByIdAndUpdate(_id, foundStudent);
      res.status(200).json(foundStudent);
    }
  }
});

const updateStudentServiceMinutes = asyncHandler(async (req, res) => {
  const mappedEvents = req.body;
  if (mappedEvents && mappedEvents.length) {
    for (let i = 0; i < mappedEvents.length; i++) {
      const student = await Student.findById(mappedEvents[i].student);
      if (student) {
        const index = student.services.findIndex(
          (service) => service.service.toString() === mappedEvents[i].service
        );
        if (index > -1) {
          if (
            student.services[index].minutesLeft !==
            student.services[index].minutesAssigned
          ) {
            student.services[index].minutesLeft =
              student.services[index].minutesAssigned;
            student.services[index].minutesUsed = 0;
            await Student.findByIdAndUpdate(student._id, student);
          }
          // update student
        }
      }
    }
    for (let i = 0; i < mappedEvents.length; i++) {
      const student = await Student.findById(mappedEvents[i].student);
      if (student) {
        const index = student.services.findIndex(
          (service) => service.service.toString() === mappedEvents[i].service
        );
        if (index > -1) {
          student.services[index].minutesLeft =
            student.services[index].minutesLeft - mappedEvents[i].minutesUsed;
          student.services[index].minutesUsed =
            student.services[index].minutesUsed + mappedEvents[i].minutesUsed;
        }
        await Student.findByIdAndUpdate(student._id, student);
      }
    }
  }
  res.status(200).json({ success: true });
});

export {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  updateStudentServices,
  updateStudentServiceMinutes,
};
