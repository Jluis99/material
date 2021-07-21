import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   constructor(
      private authService: AuthService,
      private route: Router
   ) {}
   title = 'material';

   ngOnInit(): void {
      let isLogin: boolean;
      isLogin = this.authService.validateToken();
      if (!isLogin) {
         this.route.navigateByUrl('/login');
      }
   }
}
