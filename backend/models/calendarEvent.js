import mongoose from "mongoose";
const calenderEventSchema = mongoose.Schema({
    Subject: { type: String },
    Location: { type: String },
    StartTime: { type: Date },
    EndTime: { type: Date },
    IsAllDay: { type: Boolean },
    RecurrenceRule: { type: String },
    RecurrenceException: { type: String },
    RecurrenceID: {type: Number},
    Description: { type: String },
    FollowingID: {type: Number},
    Guid:{type: String},
    StartTimezone: {type: String},
    EndTimezone: {type: String},
    Id: {type: Number},
    Schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schedule",
      default: null,
    },
    Service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentService",
      default: null,
    },
    Student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      default: null,
    },
  });
  // const CalenderEvent = mongoose.model("calendarevent", calenderEventSchema);
export default calenderEventSchema;
