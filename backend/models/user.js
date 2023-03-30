import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      default: null,
    },
    schedules: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "schedule",
      default: [],
    },
    title: {
      type: String
    },
    role: {
      type: Number,
      default: 2
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);
export default User;
