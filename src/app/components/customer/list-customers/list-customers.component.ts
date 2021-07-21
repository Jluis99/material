import { CustomerI } from './../../../models/custumer.interface';
import { CustomerService } from './../../../services/customer.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'listCustomers',
   templateUrl: './list-customers.component.html',
   styleUrls: ['./list-customers.component.scss'],
})
export class ListCustomersComponent implements OnInit {
   displayedColumns: string[] = ['name', 'city', 'order', 'options'];
   dataSource = new MatTableDataSource();
   customer: CustomerI;
   showForm = false;

   @ViewChild(MatSort) sort: MatSort;

   constructor(
      private customerService: CustomerService,
      private _snackBar: MatSnackBar,
   ) {}

   ngOnInit(): void {
      this.customerService
         .getAllCustumers()
         .subscribe((res) => (this.dataSource.data = res));
   }

   ngAfterViewInit() {
      this.dataSource.sort = this.sort;
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   async onDelete(id: string) {
      await this.customerService.deleteCustomer(id);
      this.openSnackBar('Document successfully deleted');
   }

   onCreate() {
      this.showForm = true;
      this.customer = {
         name: '',
         city: '',
         order: '',
      };
   }

   onEdit(element: CustomerI) {
      this.customer = element;
      this.showForm = true;
   }

   changeStatusForm(event) {
      this.showForm = event;
   }

   async upsertCustomer(event) {
      if (typeof event.id === 'undefined') {
         await this.customerService.addCustomer(event);
         this.openSnackBar('Document successfully added');
      } else {
         await this.customerService.updateCustomer(event);
         this.openSnackBar('Document successfully updated');
      }
   }

   openSnackBar(message: string) {
      this._snackBar.open(message, 'Close');
   }
}
