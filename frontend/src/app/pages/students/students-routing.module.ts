import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { OverviewComponent } from './overview/overview.component';
import { StudentsComponent } from './students.component';


const routes: Routes = [
  {
    path: '', component: StudentsComponent, children: [
      {path: 'overview', component: OverviewComponent, },
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
