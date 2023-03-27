import mongoose from "mongoose";

const companyServiceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
  },
  {
    timestamps: true,
  }
);
const CompanyService = mongoose.model("companyService", companyServiceSchema);
export default CompanyService;
