import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordFormComponent } from './auth/reset-password-form/reset-password-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { FooterComponent } from './nav/footer/footer.component';
import { HeaderComponent } from './nav/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ForgotPasswordFormComponent } from './auth/forgot-password-form/forgot-password-form.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    ResetPasswordFormComponent,
    RegisterFormComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    SnackbarComponent,
    ForgotPasswordFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginFormComponent,
    ResetPasswordFormComponent, 
    RegisterFormComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordFormComponent,
  ]
})
export class ComponentsModule { }
