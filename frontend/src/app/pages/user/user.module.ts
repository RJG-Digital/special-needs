import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from 'src/app/components/components.module';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import {  } from '@syncfusion/ej2-angular-schedule';
import { CalendarModule } from 'src/app/components/calendar/calendar.module';
import { SchedularModule } from 'src/app/components/schedular/schedular.module';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FlexLayoutModule,
    UserRoutingModule,
    CalendarModule,
    SchedularModule
  ],
  providers: [
   
  ],
})
export class UserModule { }
