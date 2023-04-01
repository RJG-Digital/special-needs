import mongoose from "mongoose";
const calenderEventSchema = mongoose.Schema({
    subject: { type: String },
    location: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    isAllDay: { type: Boolean },
    RecurrenceRule: { type: String },
    description: { type: String },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schedule",
      default: null,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentService",
      default: null,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      default: null,
    },
  });
  const CalenderEvent = mongoose.model("calendarevent", calenderEventSchema);
export default CalenderEvent;
