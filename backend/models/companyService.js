import mongoose from "mongoose";
const companyServiceSchema = mongoose.Schema(
  {
    company: {
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
const CompanyService = mongoose.model("companyService", companyServiceSchema);
export default CompanyService;