import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleI } from '../models/rol.interface';

@Injectable({
   providedIn: 'root',
})
export class RolService {
   private url = 'http://[::1]:3000';

   constructor(readonly http: HttpClient) {}

   getRoles(): Observable<any> {
      const url = this.url + '/role';
      return this.http.get<any>(url);
   }

}
