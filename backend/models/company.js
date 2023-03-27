import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    colors: {
      type: [String],
      default: []
    },
    website: {
      type: String,
      default: null
    },
    logo: {
      type: String,
      default: null
    },
    avalibleServices: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "companyService",
      default: [],
    },
    avaliblePrivilegIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "privilege",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model("company", companySchema);
export default Company;
