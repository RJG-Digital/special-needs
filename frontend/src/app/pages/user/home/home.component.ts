import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { View } from '@syncfusion/ej2-angular-schedule';
import { Subject, first, take, takeUntil } from 'rxjs';
import { Student } from 'src/app/models/studentModels';
import { User } from 'src/app/models/userModels';
import {
  RequestUserSchedule,
  ResponseCalendarEvents,
  ResponseUserSchedule,
} from 'src/app/models/userScheduleModels';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentsRoutingModule } from '../../students/students-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public view: View = 'WorkWeek';
  public schedules: ResponseUserSchedule[];
  public me: User;
  public selectedSchedule: ResponseUserSchedule;
  public startDate: Date;
  public endDate: Date;
  public studentList: Student[];
  public currentViewStudents: any[];

  private unsubscribe = new Subject<void>();

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private studentService: StudentService, 
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.studentService.students$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((students) => {
        this.studentList = students;
      });
    this.authService.user$.pipe(takeUntil(this.unsubscribe)).subscribe((me) => {
      if (me) {
        this.me = me;
      }
    });
    this.scheduleService
      .getMySchedules()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((s) => {
        this.schedules = s;
        if (this.schedules && this.schedules.length) {
          this.selectedSchedule = this.schedules[0];
          console.log(this.selectedSchedule);
        }
      });
  }

  public makeSchedule() {
    if (this.me._id) {
      const newSchedule: RequestUserSchedule = {
        user: this.me._id,
        name: 'First Schedule',
        description: 'this is your first schedule',
        calenderEvents: [],
      };
      this.scheduleService
        .createSchedule(newSchedule)
        .pipe(take(1))
        .subscribe((s) => {
          if (s) {
            console.log(s);
          }
        });
    }
  }

  public onEventDataUpdate(events: ResponseCalendarEvents[]) {
    this.selectedSchedule.calenderEvents = events;
    // filter events that are only in the current calendar view
    let mappedEvents = this.selectedSchedule.calenderEvents.filter((event) => {
      let eventStartDate = new Date(event.StartTime);
      let eventEndDate = new Date(event.EndTime);
      let startDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);
      return eventStartDate >= startDate && eventEndDate <= endDate;
    });
    if (mappedEvents) {
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
      console.log('TimeData: ', timeData);

      if (timeData && timeData.length) {
        timeData.forEach((event) => {
          const student = this.studentList.find((s) => s._id === event.student);
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
          const student = this.studentList.find((s) => s._id === event.student);
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
      console.log('Students List: ', this.studentList);
      const currentStudents = this.studentList.filter((s) => {
        return timeData.some((td) => s._id === td.student);
      });
      console.log('CurrentStudents: ', currentStudents);
      if (currentStudents && currentStudents.length) {
        this.currentViewStudents = currentStudents.map((student) => {
          return {
            firstName: student.firstName,
            lastName: student.lastName,
            services: student.services
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
        console.log('CurentView Students: ', this.currentViewStudents);
        this.cd.markForCheck();
      }
    }
  }

  public onStartDateChange(startDate: Date) {
    this.startDate = startDate;
  }

  public onEndDateChange(endDate: Date) {
    this.endDate = endDate;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
