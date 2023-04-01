import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ActionBeginEventArgs,
  ActionCompleteEventArgs,
} from '@syncfusion/ej2-angular-dropdowns';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/models/studentModels';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input() viewType: View = 'WorkWeek';
  @Input() data: Object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      locattion: 'away',
      StartTime: new Date(2023, 2, 27, 10, 0),
      EndTime: new Date(2023, 2, 27, 12, 0),
      Description: 'Team Meeting',
      Student: 'Tests',
      IsAllDay: true,
    },
  ];
  public eventSettings: EventSettingsModel;
  public students: Student[] = [];
  private unsubscribe = new Subject<void>();

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.refreshStudentsList();
    this.studentService.students$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((s) => {
        if (s) {
          this.students = s;
        }
      });
  }

  public onActionComplete(action: ActionCompleteEventArgs) {
    console.log(action);
  }

  public onActionBegin(action: ActionBeginEventArgs) {
    console.log('Action Begin: ', action);
  }

  public dateParser(date: any) {
    return new Date(date);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
