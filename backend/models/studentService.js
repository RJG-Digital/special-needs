import mongoose from "mongoose";
const studentServiceSchema = mongoose.Schema(
  {
    // student: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "student",
    //   default: null,
    // },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companyService",
      default: null,
    },
    minutesAssigned: {
      type: Number,
    },
    minutesUsed: {
      type: Number,
    },
    minutesLeft: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
//const StudentService = mongoose.model("studentService", studentServiceSchema);
export default studentServiceSchema;
