import { CustomerI } from './../../../models/custumer.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'app-form-customer',
   templateUrl: './form-customer.component.html',
   styleUrls: ['./form-customer.component.scss'],
})
export class FormCustomerComponent implements OnInit {
   @Input()
   customer: CustomerI;

   @Output()
   statusForm = new EventEmitter();

   @Output()
   currentCustomer = new EventEmitter();

   constructor() {}

   ngOnInit(): void {}

   cancelForm(): void {
      this.statusForm.emit(false);
   }

   sendForm(): void {
      this.cancelForm();
      this.currentCustomer.emit(this.customer);
   }

   onGuardar(myForm: NgForm): void {
      console.log(myForm);
   }
}
