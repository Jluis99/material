import { UserI } from './../../../models/user.interface';
import { UserService } from '../../../services/user.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EStatus } from 'src/app/enums/EStatus.enum';

@Component({
   selector: 'app-list-users',
   templateUrl: './list-users.component.html',
   styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit, AfterViewInit {
   dataSource = new MatTableDataSource<UserI>();
   @ViewChild(MatSort) sort: MatSort;

   displayedColumns: string[] = [
      'name',
      'lastName',
      'email',
      'status',
      'options',
   ];

   showForm = false;

   currentUser: UserI;

   constructor(
      private userService: UserService,
      private snackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
      this.userService.getUsers().subscribe(
         (data) => {
            this.dataSource.data = data.data;
         },
         (err) => console.log(err)
      );
   }

   ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
   }

   applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   openSnackBar(message: string): void {
      this.snackBar.open(message, 'Close', {
         duration: 3000
      });
   }

   createUser(): void {
      this.changeStatusForm(true);
      this.currentUser = {
         name: '',
         lastName: '',
         email: '',
         password: '12345678',
         status: 0,
         idRoles: [],
      };
   }

   changeStatusForm(state: boolean): void {
      this.showForm = state;
   }

   async resolveUserForm(event): Promise<any> {
      console.log(this.currentUser);
      this.changeStatusForm(event.state);
      if (event.upsert) {
         if (typeof this.currentUser.id === 'undefined') {
            await this.userService.createUser(this.currentUser).subscribe(
               (data) => {
                  this.dataSource.data.push(data.data);
                  this.dataSource._updateChangeSubscription();
                  this.openSnackBar('User created');
               },
               (err) => console.log(err)
            );
         } else {
            await this.userService.updateUser(this.currentUser).subscribe(
               (data) => {
                  let userEdited = this.dataSource.data.find(
                     (e) => e.id === this.currentUser.id
                  );
                  userEdited = data.data;
                  this.dataSource._updateChangeSubscription();
                  this.openSnackBar('User edited');
               },
               (err) => console.log(err)
            );
         }
      }
   }

   resolveStatus(id: number): string {
      return EStatus.result(id).value;
   }

   editUser(user: UserI): void {
      this.currentUser = user;
      this.changeStatusForm(true);
   }

   async deleteUser(user: UserI): Promise<any> {
      await this.userService.deleteUser(user.id).subscribe(
         (data) => {
            const index = this.dataSource.data.indexOf(user);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.openSnackBar('El usuario fue eliminado correctamente');
         },
         (err) => console.log(err)
      );
   }
}
