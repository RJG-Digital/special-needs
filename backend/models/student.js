import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String
    },
    teacher: {
      type: String,
    },
    homeroomNumber: {
      type: Number,
    },
    company: {
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
    schoolIssuedId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Student = mongoose.model("student", studentSchema);
export default Student;
