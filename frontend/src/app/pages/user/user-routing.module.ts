import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';


const routes: Routes = [
 
  {path: '', component: UserComponent, children: [
    {path: 'dashboard', component: HomeComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
