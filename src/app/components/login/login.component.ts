import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

   loginForm = new FormGroup({
      email: new FormControl('', [
         Validators.required,
         Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
         Validators.required,
         Validators.minLength(8),
      ]),
   });

   constructor(private loginService: LoginService, private route: Router, private authService: AuthService) {}

   ngOnInit(): void {
      let isLogin: boolean;
      isLogin = this.authService.validateToken();
      if (isLogin) {
         this.route.navigateByUrl('/home');
      }
   }

   onSubmit(): void {
      if (this.loginForm.valid) {
         this.loginService.login(this.loginForm.value).subscribe({
            next: data => {
               this.authService.setToken(data.data.accessToken);
               this.route.navigateByUrl('/customers');
            },
            error: error => {
               console.log(error);
            }
         });
      } else {
         console.log('Form not valid');
      }
   }
}
