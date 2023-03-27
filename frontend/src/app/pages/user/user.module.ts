import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from 'src/app/components/components.module';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';

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
    UserRoutingModule
  ]
})
export class UserModule { }
