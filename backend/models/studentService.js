import mongoose from "mongoose";

const studentServiceSchema = mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companyService",
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
const StudentService = mongoose.model("studentService", studentServiceSchema);
export default StudentService;
