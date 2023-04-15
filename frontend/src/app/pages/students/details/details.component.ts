import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/models/studentModels';
import { ResponseCalendarEvents, ResponseUserSchedule } from 'src/app/models/userScheduleModels';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  public student: Student;
  public studentId: string | null;
  public studentSchedule: ResponseUserSchedule;
  public startDate: Date;
  public endDate: Date;
  public currentViewStudents: any;

  constructor(
    private studentService: StudentService,
    private scheduleService: ScheduleService,
    private schedulerService: SchedulerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.studentId = params.get('id');
      if (this.studentId) {
        this.studentService
          .getStudent(this.studentId)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((s) => {
            this.student = s;
            this.scheduleService
              .getStudentSchedule(s._id)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe((schedule) => {
                if(schedule && schedule.calenderEvents.length) {
                  this.studentSchedule = schedule;
                  console.log(this.studentSchedule.calenderEvents);
                }
                console.log( schedule.calenderEvents);
                
              });
          });
      }
    });
  }

  public onEventDataUpdate(events: {
    recurringEvents: ResponseCalendarEvents[];
    currentViewEvents: ResponseCalendarEvents[];
  }) {
    console.log('EVENT UPDATE', events);
    this.currentViewStudents =  this.schedulerService.getUpdatedEvents(events.currentViewEvents, this.startDate, this.endDate, [this.student])
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
