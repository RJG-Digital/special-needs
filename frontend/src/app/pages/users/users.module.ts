import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverviewComponent } from './overview/overview.component';
import { UsersRoutingModule } from './users-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    UsersComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    UsersRoutingModule, 
    ComponentsModule
  ], 
  exports: [UsersComponent, OverviewComponent]
})
export class UsersModule { }
