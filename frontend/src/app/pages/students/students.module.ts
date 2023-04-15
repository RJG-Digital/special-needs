import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { OverviewComponent } from './overview/overview.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentsRoutingModule } from './students-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailsComponent } from './details/details.component';
import { SchedularModule } from 'src/app/components/schedular/schedular.module';

@NgModule({
  declarations: [StudentsComponent, OverviewComponent, DetailsComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, StudentsRoutingModule, ComponentsModule, SchedularModule],
  exports: [StudentsComponent, OverviewComponent],
})
export class StudentsModule {}
