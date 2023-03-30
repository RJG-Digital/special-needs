import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RecurrenceEditorModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DatePickerModule, DateTimePickerModule} from '@syncfusion/ej2-angular-calendars'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ScheduleModule,
    RecurrenceEditorModule,
    MaterialModule, 
    FlexLayoutModule,
    DropDownListModule,
    DatePickerModule,
    DateTimePickerModule,
   ReactiveFormsModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
