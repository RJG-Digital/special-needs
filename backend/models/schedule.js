import mongoose from "mongoose";
import calenderEventSchema from "./calendarEvent.js";
const scheduleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
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
  },
  {
    timestamps: true,
  }
);
const Schedule = mongoose.model("schedule", scheduleSchema);
export default Schedule;
