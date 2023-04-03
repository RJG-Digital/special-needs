import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ActionBeginEventArgs,
  ActionCompleteEventArgs,
} from '@syncfusion/ej2-angular-dropdowns';
import { ActionEventArgs, EventSettingsModel, PopupCloseEventArgs, PopupOpenEventArgs, ScheduleComponent, View } from '@syncfusion/ej2-angular-schedule';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/models/studentModels';
import { StudentService } from 'src/app/services/student.service';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
  selector: 'app-calendar',
  // templateUrl: './calendar.component.html',
  template: `<div class="full-page-calendar">
  <ejs-schedule  
  #scheduleObj
  [editorTemplate]="eventEditorTemplate"
  (actionBegin)="onActionBegin($event)"
  (popupOpen)="onPopupOpen($event)"
  (popupClose)="onPopupClose($event)"
  (actionComplete)="onActionComplete($event)" 
  [timeScale]="{ enable: true, interval: 30, slotCount: 1 }" 
  [workHours]="{ start: '06:00', end: '16:00' }" style="margin:24px" height="100%" 
  [eventSettings]="eventSettings" 
  [currentView]="viewType">
  <ng-template #eventEditorTemplate let-data>
      <app-event-form #form [starDate]="startDate" [endDate]="endDate" [inSubject]="subject" [inDescription]="description" [inIsAllDay]="isAllDay" [inService]="service" [inStudent]="student" [inLocation]="location" (onFormChange)="onFormChange($event)" [studentsList]="students"></app-event-form>
</ng-template>
</ejs-schedule>
</div>
`,
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input() viewType: View = 'WorkWeek';
  @Input() data: Object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      Location: 'away',
      StartTime: new Date(),
      EndTime: new Date(),
      Description: 'Team Meeting',
      Student: 'Tests',
      IsAllDay: true,
    },
  ];
  public eventSettings: EventSettingsModel;
  public students: Student[] = [];
  public startDate: Date;
  public endDate: Date;
  public editForm: any;
  public subject: string; 
  public location: string;  
  public description: string; 
  public student: string;  
  public service: string; 
  public isAllDay: boolean;

  private unsubscribe = new Subject<void>();

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('form') public form: EventFormComponent;

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

  public onFormChange(form: any) {
    this.editForm = form;
  }

  public onPopupOpen(action:PopupOpenEventArgs) {
    if(action && action.data) {
      const {EndTime, StartTime, IsAllDay, Location, Subject, Description, Student, Service } = action.data;
      this.startDate = StartTime;
      this.endDate = EndTime;
      this.subject = Subject;
      this.location = Location;
      this.description = Description;
      this.student =  Student;
      this.service = Service;
      this.isAllDay = IsAllDay;

    }
  }
  public onPopupClose(action: PopupCloseEventArgs) {
    console.log('onPopupClose: ', action);
    if(action.type === 'Editor') {
      if(this.editForm.invalid) {
        action.cancel = true;
      }  else {
        const event = {
          Id: action.data?.["Id"] ? action.data?.["Id"] : 1,
          Subject: this.editForm.subject,
          Location:  this.editForm.location,
          StartTime:  this.editForm.startTime,
          EndTime:  this.editForm.endTime,
          Description:  this.editForm.description,
          Student:  this.editForm.studentId,
          Service:  this.editForm.serviceId,
          IsAllDay:  this.editForm.isAllDay
        }
       this.scheduleObj.addEvent(event);
      }
    }
  }

  public onActionComplete(action: ActionCompleteEventArgs) {
    console.log('Complete! ', action);
    // Move add action here?? 

   
  }

  public onActionBegin(args: ActionEventArgs) {
    console.log('Action Begin: ', args);
    if(args && this.editForm && this.editForm.invalid && args.requestType === 'eventCreate') {
      }
    }

  public dateParser(date: any) {
    return new Date(date);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
