import mongoose from "mongoose";
const companyServiceSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const StudentService = mongoose.model("studentService", studentServiceSchema);
export default StudentService;