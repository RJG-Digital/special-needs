import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetPasswordFormComponent } from './auth/reset-password-form/reset-password-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { FooterComponent } from './nav/footer/footer.component';
import { HeaderComponent } from './nav/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ForgotPasswordFormComponent } from './auth/forgot-password-form/forgot-password-form.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { StudentsTableComponent } from './students/students-table/students-table.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ServiceTableComponent } from './services/service-table/service-table.component';
import { ServiceFormComponent } from './services/service-form/service-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    ResetPasswordFormComponent,
    RegisterFormComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    SnackbarComponent,
    ForgotPasswordFormComponent,
    UsersTableComponent,
    StudentsTableComponent,
    StudentFormComponent,
    UserFormComponent,
    DrawerComponent,
    ServiceTableComponent,
    ServiceFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoginFormComponent,
    ResetPasswordFormComponent, 
    RegisterFormComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordFormComponent,
    UsersTableComponent,
    StudentsTableComponent,
    StudentFormComponent,
    DrawerComponent,   
    ServiceTableComponent,
    ServiceFormComponent,
  ]
})
export class ComponentsModule { }
