import mongoose from "mongoose";
const roleSchema = mongoose.Schema({
  number:{
    type: Number
  },
  name:{
    type: String
  },
  canCreateUsers: {
    type: Boolean
  },
  canCreateSchedules: {
    type: Boolean
  },
  canCreateStudents: {
    type: Boolean
  },
  canViewStudents: {
    type: Boolean
  },
  canViewSchedules: {
    type: Boolean
  }, 
  canViewUsers: {
    type: Boolean
  },
});
const defaultUserRoles = [
  {
    number: 0,
    name: 'Administrator',
    canCreateUsers: true,
    canCreateSchedules: true,
    canCreateStudents: true,
    canViewStudents: true,
    canViewSchedules: true,
    canViewUsers: true,
  },
  {
    number: 1,
    name: 'Teacher',
    canCreateUsers: false,
    canCreateSchedules: true,
    canCreateStudents: false,
    canViewStudents: true,
    canViewSchedules: true,
    canViewUsers: true,
  },
  {
    number: 2,
    name: 'Read only',
    canCreateUsers: false,
    canCreateSchedules: false,
    canCreateStudents: false,
    canViewStudents: true,
    canViewSchedules: true,
    canViewUsers: true,
  },
  {
    number: 3,
    name: 'Para',
    canCreateUsers: false,
    canCreateSchedules: false,
    canCreateStudents: false,
    canViewStudents: true,
    canViewSchedules: true,
    canViewUsers: false,
  },
]
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
    userRoles: {
      type: [roleSchema],
      default: defaultUserRoles,
    },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model("company", companySchema);
export default Company;
