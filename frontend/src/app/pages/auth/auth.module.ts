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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    ResetPasswordPageComponent,
    RegisterPageComponent,
    AuthComponent,
    ForgotPasswordPageComponent,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }