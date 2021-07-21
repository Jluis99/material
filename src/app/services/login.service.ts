import { Observable } from 'rxjs';
import { LoginI } from './../models/login.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root',
})
export class LoginService {
   constructor(private http: HttpClient) {}

   login(data: LoginI): Observable<any> {
      const url = 'http://[::1]:3000/auth/login';
      return this.http.post<any>(url, data);
   }
}
