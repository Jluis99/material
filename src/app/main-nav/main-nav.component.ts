import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
   selector: 'app-main-nav',
   templateUrl: './main-nav.component.html',
   styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
   isHandset$: Observable<boolean> = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
         map((result) => result.matches),
         shareReplay()
      );

   constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private route: Router) {}

   isLogged(): boolean {
      return !this.authService.validateToken();
   }

   logOut() {
      console.log("asjdasd");
      this.authService.removeToken();
      this.route.navigateByUrl('/login');
   }
}
