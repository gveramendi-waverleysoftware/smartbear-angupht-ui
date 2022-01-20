import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserCreateComponent },
  { path: 'users/:id', component: UserCreateComponent },
  { path: 'register', component: UserCreateComponent },
  { path: 'changepassword', component: ChangePasswordComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
