import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
   providedIn: 'root',
})
export class AuthService {

   static TOKEN_KEY = 'access_token';

   static getToken(): string {
      return localStorage.getItem(AuthService.TOKEN_KEY);
   }

   constructor(private helper: JwtHelperService) {}

   setToken(accessToken: string): void{
      console.log('Token', accessToken);
      localStorage.setItem(AuthService.TOKEN_KEY, accessToken);
   }

   getDecodeToken(): any {
      return this.helper.decodeToken(AuthService.getToken());
   }

   validateToken(): boolean {
      return ! this.helper.isTokenExpired(AuthService.getToken());
   }

   removeToken(): void {
      localStorage.removeItem(AuthService.TOKEN_KEY);
   }

   getExpirationDate(): Date {
      return this.helper.getTokenExpirationDate(AuthService.getToken());
   }
}
