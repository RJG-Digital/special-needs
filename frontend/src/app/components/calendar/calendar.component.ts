import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  
  @Input() viewType: View = 'WorkWeek';
  public data: Object[] = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2023, 2, 27, 10, 0),
      EndTime: new Date(2023, 2, 27, 12, 0),
      Description: "Team Meeting",
      Student: 'Tests'
    },
    {
      Id: 2,
      Subject: "Appointment",
      StartTime: new Date(2023, 2, 28, 15, 0),
      EndTime: new Date(2023, 2, 28, 17, 0),
      Description: "Doctor Appointment",
      Student: 'Test'
    },
  ];

  public onActionComplete(action: any) {
    console.log(action);
  }

  public dateParser(date: any) {
    return new Date(date);
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }

}
