import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    fristName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    teacher: {
      type: String,
    },
    homeroomNumber: {
      type: Number,
    },
    serviceIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "studentService",
      default: [],
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      default: null,
    },
    grade: {
      type: Number
    },
    profileImage: {
      type: String,
    },
    gender: {
      type: String,
    },
    carTag: {
      type: Number,
    },
    studentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Student = mongoose.model("studentService", studentSchema);
export default Student;
