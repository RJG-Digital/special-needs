import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesComponent } from './schedules.component';
import { OverviewComponent } from './overview/overview.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    SchedulesComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ComponentsModule,
    SchedulesRoutingModule
  ],
  exports:[
    SchedulesComponent,
    OverviewComponent
  ]
})
export class SchedulesModule { }
