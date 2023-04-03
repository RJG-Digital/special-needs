import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './pages/auth/auth.module';
import { UserModule } from './pages/user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { UsersModule } from './pages/users/users.module';
import { CalendarModule } from './components/calendar/calendar.module';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars'
import { StudentsModule } from './pages/students/students.module';
import { SchedularModule } from './components/schedular/schedular.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AuthModule,
    UserModule,
    UsersModule,
    HttpClientModule,
    ScheduleModule,
    RecurrenceEditorModule,
    DropDownListModule,
    DatePickerModule,
    CalendarModule,
    SchedularModule,
    StudentsModule
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
    DragAndDropService,
    ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
