import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  ActionEventArgs,
  EventSettingsModel,
  RecurrenceEditor,
  ScheduleComponent,
  View,
} from '@syncfusion/ej2-angular-schedule';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/models/studentModels';
import { ResponseCalendarEvents, ResponseUserSchedule } from 'src/app/models/userScheduleModels';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.scss'],
})
export class SchedularComponent implements OnInit, OnDestroy {
  @Input() viewType: View = 'WorkWeek';
  @Input() studentsList: Student[] = [];
  @Input() schedule: ResponseUserSchedule;

  @Output() onScheduleUpdate = new EventEmitter<ResponseUserSchedule>()

  public repeatEndOptionFields: Object = { text: 'text', value: 'value' };
  public repeatOptionFields: Object = { text: 'text', value: 'value' };
  public studentFields: Object = { text: 'studentName', value: 'studentId' };
  public mappedStudents: any;
  public mappedServices: any;
  public eventSettings: EventSettingsModel;
  public isServiceDropdownEnabled = false;
  public recurrenceRule: any;

  private unsubscribe = new Subject<void>();

  @ViewChild('schedularObj') public scheduleObj: ScheduleComponent;
  @ViewChild('serviceDropdown') public serviceDropdown: DropDownListComponent;
  @ViewChild('studentDropdown') public studentDropdown: DropDownListComponent;
  @ViewChild('recurrenceEditor') public recurrenceEditor: RecurrenceEditor;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    if(this.schedule && this.schedule.calenderEvents) {
      console.log(this.schedule.calenderEvents);
      this.eventSettings = {
        dataSource: this.schedule.calenderEvents ? this.schedule.calenderEvents : [],
      }
    }
    this.studentService.refreshStudentsList();
    this.studentService.students$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((s) => {
        if (s) {
          this.studentsList = s;
          if (this.studentsList && this.studentsList.length) {
            this.mappedStudents = this.studentsList.map((s) => {
              return {
                studentName: `${s.firstName} ${s.lastName}`,
                studentId: s._id,
              };
            });
          }
        }
      });
  }

  public dateParser(date: any) {
    return new Date(date);
  }

  public onStudentChange(args: any) {
    if (args.value) {
      this.isServiceDropdownEnabled = true;
      this.serviceDropdown.dataBind();
    }
  }
  public onPopupOpen(args: any) {
    if (args.type === 'Editor' && !args.data.Student) {
      this.isServiceDropdownEnabled = false;
      this.serviceDropdown.dataBind();
    }
  }

  public onActionBegin(args: any) {
    if (args.requestType === 'eventCreate') {
      let data = args.data[0];
      data.RecurrenceRule = this.recurrenceRule;
      args.modifiedData = data;
    } else if (args.requestType === 'eventChange') {
      let data = args.data[0];
      if (data) {
        if (data.RecurrenceRule === null && this.recurrenceRule !== null) {
          data.RecurrenceRule = this.recurrenceRule;
          data.changedRecords = [data];
          args.modifiedData = data;
        }
      }
    }
  }

  public onActionComplete(args: any) {
    args.data = args.data?.map((d: any) => {
      return { ...d, RecurrenceRule: this.recurrenceRule };
    });
    if (this.scheduleObj) {
      setTimeout(() => {
        console.log(this.scheduleObj.getEvents())
        this.schedule.calenderEvents = this.scheduleObj.getEvents() as ResponseCalendarEvents[];
        this.onScheduleUpdate.emit(this.schedule);
      }, 1000);
    }
  }

  public onRecurrenceEditorChange(event: any, data: any) {
    if(event.value) {
      this.recurrenceRule = event.value;
    }
   
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
