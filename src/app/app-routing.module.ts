import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListCustomersComponent } from './components/customer/list-customers/list-customers.component';

const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'customers', component: ListCustomersComponent },
   { path: 'users', component: ListUsersComponent },
   { path: 'home', component: HomeComponent },
   { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
