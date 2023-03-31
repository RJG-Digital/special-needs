import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ForgotPasswordPageComponent } from './pages/auth/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { ResetPasswordPageComponent } from './pages/auth/reset-password-page/reset-password-page.component';
import { HomeComponent } from './pages/user/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'resetpassword/:token',
    component: ResetPasswordPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
