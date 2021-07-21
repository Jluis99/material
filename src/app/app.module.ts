import { JwtModule } from '@auth0/angular-jwt';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerService } from './services/customer.service';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { MatModule } from './mat/mat.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ListCustomersComponent } from './components/customer/list-customers/list-customers.component';
import { FormCustomerComponent } from './components/customer/form-customer/form-customer.component';

// Firebase
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { FormComponent } from './components/user/form/form.component';

@NgModule({
   declarations: [
      AppComponent,
      ListCustomersComponent,
      FormCustomerComponent,
      MainNavComponent,
      HomeComponent,
      LoginComponent,
      ListUsersComponent,
      FormComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.configFirebase),
      MatModule,
      FormsModule,
      ReactiveFormsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: AuthService.getToken,
            allowedDomains: ['localhost:3000', 'jsonplaceholder.typicode.com', '[::1]:3000'],
         },
      }),
      HttpClientModule,
   ],
   providers: [CustomerService],
   bootstrap: [AppComponent],
})
export class AppModule {}
