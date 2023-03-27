import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LoginPageComponent,
    ResetPasswordPageComponent,
    RegisterPageComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AuthRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    LoginPageComponent,
    ResetPasswordPageComponent,
    RegisterPageComponent,
  ]
})
export class AuthModule { }