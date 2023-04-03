import { User } from './userModels';

export interface ResponseUserSchedule {
  _id?: string;
  user: User;
  name: string;
  description: string;
  calenderEvents: ResponseCalendarEvents[];
}

export interface RequestUserSchedule {
  _id?: string;
  user: string;
  name: string;
  description: string;
  calenderEvents: RequestCalendarEvents[];
}

export interface RequestCalendarEvents {
  _id?: string;
  Subject: string;
  Location: string;
  Description: string;
  RecurrenceRule: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay: boolean;
  Student: string;
  Service: string;
  Schedule: string;
  Guid: string;
  StartTimezone: string;
  EndTimezone: string;
  RecurrenceException: string;
  Id: number;
  RecurrenceID: number;
  FollowingID: number;
}

export interface ResponseCalendarEvents {
  _id?: string;
  Subject: string;
  Location: string;
  Description: string;
  RecurrenceRule: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay: boolean;
  Student: User;
  Service: Service;
  Schedule: ResponseUserSchedule;
  Guid: string;
  StartTimezone: string;
  EndTimezone: string;
  RecurrenceException: string;
  Id: number;
  RecurrenceID: number;
  FollowingID: number;
}

export interface Service {}
