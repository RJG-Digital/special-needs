import mongoose from "mongoose";

const privilegeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: null
    },
  },
  {
    timestamps: true,
  }
);
const Privilege = mongoose.model("privilege", privilegeSchema);
export default Privilege;
