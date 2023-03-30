import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    calenderEvents: [calenderEventSchema],
    default: [],
  },
  {
    timestamps: true,
  }
);
const Schedule = mongoose.model("schedule", scheduleSchema);
export default Schedule;
