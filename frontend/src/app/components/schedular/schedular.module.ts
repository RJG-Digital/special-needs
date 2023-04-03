import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedularComponent } from './schedular.component';
import { RecurrenceEditorModule, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    SchedularComponent
  ],
  imports: [
    CommonModule,
    ScheduleModule,
    RecurrenceEditorModule,
    MaterialModule, 
    FlexLayoutModule,
    DropDownListModule,
    DatePickerModule,
    CheckBoxModule,
    DateTimePickerModule,
  ], exports: [SchedularComponent]
})
export class SchedularModule { }
