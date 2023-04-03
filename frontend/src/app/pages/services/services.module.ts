import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { OverviewComponent } from './overview/overview.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServicesRoutingModule } from './services-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ServicesComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FlexLayoutModule,
    ServicesRoutingModule
  ],
  exports: [
    ServicesComponent,
    OverviewComponent
  ]
})
export class ServicesModule { }
