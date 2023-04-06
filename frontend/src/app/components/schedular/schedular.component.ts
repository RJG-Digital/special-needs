import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  EventSettingsModel,
  RecurrenceEditor,
  ScheduleComponent,
  View,
} from '@syncfusion/ej2-angular-schedule';
import { Subject, take, takeUntil } from 'rxjs';
import { ResponseCompanyService } from 'src/app/models/companyServiceModels';
import { Student } from 'src/app/models/studentModels';
import {
  ResponseCalendarEvents,
  ResponseUserSchedule,
} from 'src/app/models/userScheduleModels';
import { CompanyServiceService } from 'src/app/services/company-service.service';
import { ScheduleService } from 'src/app/services/schedule.service';
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

  @Output() onStartDateChange = new EventEmitter<Date>();
  @Output() onEndDateChange = new EventEmitter<Date>();
  @Output() onScheduleUpdate = new EventEmitter<ResponseUserSchedule>();

  public repeatEndOptionFields: Object = { text: 'text', value: 'value' };
  public repeatOptionFields: Object = { text: 'text', value: 'value' };
  public studentFields: Object = { text: 'studentName', value: 'studentId' };
  public serviceFields: Object = { text: 'serviceName', value: 'serviceId' };
  public mappedStudents: any;
  public mappedServices: any;
  public eventSettings: EventSettingsModel;
  public isServiceDropdownEnabled = false;
  public recurrenceRule: any;
  public companyServices: ResponseCompanyService[];
  private unsubscribe = new Subject<void>();

  @ViewChild('schedularObj') public scheduleObj: ScheduleComponent;
  @ViewChild('eventTemplate') public eventTemplate: any;
  @ViewChild('serviceDropdown') public serviceDropdown: DropDownListComponent;
  @ViewChild('studentDropdown') public studentDropdown: DropDownListComponent;
  @ViewChild('recurrenceEditor') public recurrenceEditor: RecurrenceEditor;

  constructor(
    private studentService: StudentService,
    private scheduleService: ScheduleService,
    private companyServiceService: CompanyServiceService
  ) {}

  ngOnInit(): void {
    this.companyServiceService.companyServices$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((companyServices) => {
        this.companyServices = companyServices;
      });
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
    if (this.schedule && this.schedule.calenderEvents) {
      // Mapping events to calender
      this.eventSettings = {
        dataSource: this.schedule.calenderEvents
          ? this.schedule.calenderEvents.map((c) => {
              return {
                Description: c.Description,
                EndTime: c.EndTime,
                Guid: c.Guid,
                IsAllDay: c.IsAllDay,
                Location: c.Location,
                Service: c.Service,
                StartTime: c.StartTime,
                Student: c.Student,
                Subject: c.Subject,
                RecurrenceRule: c.RecurrenceRule,
                Id: c.Id,
                StartTimezone: c.StartTimezone,
                EndTimezone: c.EndTimezone,
                RecurrenceException: c.RecurrenceException,
                RecurrenceID: c.RecurrenceID,
                FollowingID: c.FollowingID,
              };
            })
          : [],
      };
    }
  }

  public onStudentChange(args: any) {
    if (args.value) {
      this.mapStudentServices(args);
    }
  }

  public onPopupOpen(args: any) {
    if (args.type === 'Editor' && !args.data.Student) {
      this.isServiceDropdownEnabled = false;
      this.serviceDropdown.dataBind();
    } else if (args.type === 'Editor' && args.data.Student) {
      this.mapStudentServices(args);
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

  public onCreated(args: any) {
    this.updateViewDates();
  }

  public onActionComplete(args: any) {
    args.data = args.data?.map((d: any) => {
      return { ...d, RecurrenceRule: this.recurrenceRule };
    });
    // Get dates to filter students
    if (
      args.requestType === 'viewNavigate' ||
      args.requestType === 'dateNavigate'
    ) {
      this.updateViewDates();
    }
  }

  public onRecurrenceEditorChange(event: any, data: any) {
    if (event.value) {
      this.recurrenceRule = event.value;
    }
  }

  private updateDB() {
    const mappedData = this.scheduleObj.getEvents().map((e) => {
      return {
        ...e,
        Service: e['Service'] && e['Service'].length ? e['Service'] : null,
        Student: e['Student'] && e['Student'].length ? e['Student'] : null,
      };
    });
    this.schedule.calenderEvents = mappedData as ResponseCalendarEvents[];
    if (this.schedule._id) {
      this.scheduleService
        .updateSchedule(this.schedule?._id, this.schedule as any)
        .pipe(take(1))
        .subscribe((s) => {
          console.log(s);
        });
    }
  }

  public onDataBound() {
    this.updateDB();
  }

  public onEventRendered(args: any) {
    setTimeout(() => {
      if (this.studentsList) {
        const companyServiceId = args.data.Service;
        const foundService = this.companyServices.find(
          (cs) => cs._id === companyServiceId
        );
        if (foundService) {
          const color = foundService.color;
          if (this.scheduleObj.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor =
              color;
          } else {
            args.element.style.backgroundColor = color;
          }
        }
      }
    }, 100);
  }

  private updateViewDates() {
    const currentViewDates = this.scheduleObj.getCurrentViewDates();
    const startDate = currentViewDates[0];
    const endDate = currentViewDates[currentViewDates.length - 1];
    this.onStartDateChange.emit(startDate);
    this.onEndDateChange.emit(endDate);
  }

  private mapStudentServices(args: any) {
    this.mappedServices = this.studentsList
      .find((s) => s._id === args.data.Student)
      ?.services?.map((service: any) => {
        return {
          serviceName: service.service.name, //company service cred here (horid naming)
          serviceId: service.service._id, //company service cred here (horid naming)
        };
      });
    this.isServiceDropdownEnabled = true;
    this.serviceDropdown.dataBind();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
