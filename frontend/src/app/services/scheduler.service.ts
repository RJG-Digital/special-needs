import { Injectable } from '@angular/core';
import { ResponseCalendarEvents } from '../models/userScheduleModels';
import { Student } from '../models/studentModels';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor() { }

  public getUpdatedEvents(events: ResponseCalendarEvents[], viewStartDate: Date, viewEndDate: Date, studentList: Student[]) {
    let currentViewStudents: any = [];
    // filter events that are only in the current calendar view
    let mappedEvents = events.filter((event) => {
      let eventStartDate = new Date(event.StartTime).getDate();
      let eventEndDate = new Date(event.EndTime).getDate();
      let startDate = new Date(viewStartDate).getDate();
      let endDate = new Date(viewEndDate).getDate();
      return eventStartDate >= startDate && eventEndDate <= endDate;
    });
    if (mappedEvents) {
      console.log('Mapped Events: ', mappedEvents);
      const timeData = mappedEvents.map((e) => {
        const diffInMs = Math.abs(e.EndTime.getTime() - e.StartTime.getTime());
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return {
          service: e.Service,
          startTime: e.StartTime,
          endTime: e.EndTime,
          minutesUsed: diffInMinutes,
          student: e.Student,
          subject: e.Subject,
        };
      });

      if (timeData && timeData.length) {
        timeData.forEach((event) => {
          const student = studentList.find((s) => s._id === event.student);
          if (student) {
            const index = student.services.findIndex(
              (service) => service.service._id.toString() === event.service
            );
            if (index > -1) {
              if (
                student.services[index].minutesLeft !==
                student.services[index].minutesAssigned
              ) {
                student.services[index].minutesLeft =
                  student.services[index].minutesAssigned;
                student.services[index].minutesUsed = 0;
              }
            }
          }
        });

        timeData.forEach((event) => {
          const student = studentList.find((s) => s._id === event.student);
          if (student) {
            const index = student.services.findIndex(
              (service) => service.service._id.toString() === event.service
            );
            if (index > -1) {
              student.services[index].minutesLeft =
                student.services[index].minutesLeft - event.minutesUsed;
              student.services[index].minutesUsed =
                student.services[index].minutesUsed + event.minutesUsed;
            }
          }
        });
      }
      
      const currentStudents = studentList.filter((s) => {
        return timeData.some((td) => s._id === td.student);
      });
      if (currentStudents && currentStudents.length) {
        currentViewStudents = currentStudents.map((student) => {
          let services = student.services.filter((s) => s.minutesUsed > 0);
          services = services.filter((s) => {
            return timeData.some((td) => s.service._id === td.service);
          });
          return {
            firstName: student.firstName,
            lastName: student.lastName,
            services: services
              .filter((s) => s.minutesUsed > 0)
              .map((s) => {
                return {
                  minutesAssigned: s.minutesAssigned,
                  minutesLeft: s.minutesLeft,
                  minutesUsed: s.minutesUsed,
                  name: s.service.name,
                  color: s.service.color,
                  _id: s.service._id,
                };
              }),
            profileImage: student.profileImage,
            StudentId: student._id,
          };
        });
        if (!currentViewStudents.length) {
          currentViewStudents = [];
        }
      } else {
        currentViewStudents = [];
      }
    }
    return currentViewStudents;
  }
}