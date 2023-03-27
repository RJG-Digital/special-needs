import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './pages/auth/auth.module';
import { UserModule } from './pages/user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AuthModule,
    UserModule,
    HttpClientModule,
    ScheduleModule, RecurrenceEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
