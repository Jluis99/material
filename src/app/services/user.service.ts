import { Observable } from 'rxjs';
import { UserI } from './../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class UserService {
   private url = 'http://[::1]:3000';
   constructor(private http: HttpClient) {}

   getUsers(): Observable<any> {
      const url = this.url + '/user';
      return this.http.get<any>(url);
   }

   createUser(data: UserI): Observable<any> {
      const url = this.url + '/user/register';
      return this.http.post<any>(url, data);
   }

   updateUser(data: UserI): Observable<any> {
      const url = this.url + '/user/' + data.id;
      return this.http.put<any>(url, data);
   }

   deleteUser(id: number): Observable<any> {
      const url = this.url + '/user/' + id;
      return this.http.delete(url);
   }
}
