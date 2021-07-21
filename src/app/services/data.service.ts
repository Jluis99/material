import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class DataService {
   constructor(private http: HttpClient) {}

   pruebaHttp () {
      const url = 'https://jsonplaceholder.typicode.com/todos';
      return this.http.get<any>(url);
   }
}
