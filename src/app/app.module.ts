import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Constants } from './helpers/constants';

import { LoginComponent } from './components/login/login.component';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { DatePipe } from '@angular/common';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { AlertComponent } from './components/alert/alert.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    HomeComponent,
    UserCreateComponent,
    AlertComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders,Constants,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
