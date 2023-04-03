import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '', component: ServicesComponent, children: [
      {path: 'overview', component: OverviewComponent, },
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
