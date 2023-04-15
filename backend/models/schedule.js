import mongoose from "mongoose";
import calenderEventSchema from "./calendarEvent.js";
const scheduleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    // student: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "student",
    //   default: null,
    // },
    // isStudentSchedule: {
    //   type: Boolean,
    //   default: false
    // },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    calenderEvents: {
      type: [calenderEventSchema],
      default: [],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      default: null,
    }
  },
  {
    timestamps: true,
  }
);
const Schedule = mongoose.model("schedule", scheduleSchema);
export default Schedule;
