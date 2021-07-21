import { RolService } from './../../../services/rol.service';
import { UserI } from './../../../models/user.interface';
import {
   FormGroup,
   FormControl,
   Validators,
   FormArray,
   ValidatorFn,
} from '@angular/forms';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { RoleI } from 'src/app/models/rol.interface';

@Component({
   selector: 'app-form',
   templateUrl: './form.component.html',
   styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
   @Input()
   currentUser: UserI;

   @Input()
   showForm: boolean;

   @Output()
   statusForm = new EventEmitter();

   submitted = false;
   emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
   userForm: FormGroup;

   form: FormGroup;
   roles: RoleI[] = [];

   get rolesFormArray(): any {
      return this.userForm.controls.roles as FormArray;
   }

   get registerFormControl(): any {
      return this.userForm.controls;
   }

   private addCheckboxes(): void {
      this.roles.forEach(() =>
         this.rolesFormArray.push(new FormControl(false))
      );
   }

   constructor(private rolService: RolService) {
      this.getRoles();
   }

   ngOnInit(): void {
      this.userForm = new FormGroup({
         id: new FormControl(this.currentUser.id),
         name: new FormControl(this.currentUser.name, [
            Validators.required,
            Validators.maxLength(255),
         ]),
         lastName: new FormControl(this.currentUser.lastName, [
            Validators.required,
            Validators.maxLength(255),
         ]),
         email: new FormControl(this.currentUser.email, [
            Validators.required,
            Validators.pattern(this.emailPattern),
            Validators.minLength(8),
         ]),
         status: new FormControl(this.currentUser.status, [
            Validators.required,
         ]),
         roles: new FormArray([], minSelectedCheckboxes(1)),
         adresses: new FormArray([
            new FormControl('', [
               Validators.required,
               Validators.minLength(10),
            ]),
         ]),
      });
   }

   getCheckData(): any {
      return this.userForm.value.roles
         .map((v, i) => (v ? this.roles[i].id : null))
         .filter((v) => v !== null);
   }

   validForm(type: string, name: string, options?: any): string {
      const INPUT_VALIDATE = {
         required: ' is required.',
         maxLength:
            ' cannot exceed ' +
            options?.maxLength +
            ' characters. Current ' +
            options?.actualLength +
            '.',
         minLength:
            ' must have a minimum of ' +
            options?.minLength +
            ' characters. Current ' +
            options?.actualLength +
            '.',
         email: ' must be a correct email.',
      };

      return 'The ' + name + ' field ' + INPUT_VALIDATE[type];
   }

   get adresses(): any {
      return this.userForm.get('adresses') as FormArray;
   }

   addAdresses(): void {
      this.adresses.push(
         new FormControl('', [Validators.required, Validators.minLength(10)])
      );
   }

   removeAdresses(index: number): void {
      this.adresses.removeAt(index);
   }

   cancelForm(upsert: boolean = false): void {
      const obj = {
         state: false,
         upsert,
      };

      this.statusForm.emit(obj);
   }

   async getRoles(): Promise<any> {
      await this.rolService.getRoles().subscribe(
         (data) => {
            console.log(data);
            data.data.map((e) => {
               this.roles.push({
                  id: e.id,
                  name: e.name,
               });
            });
            this.addCheckboxes();
         },
         (err) => console.log(err)
      );
   }

   async onSubmit(): Promise<any> {
      this.submitted = true;
      this.currentUser.name = this.userForm.value.name;
      this.currentUser.lastName = this.userForm.value.lastName;
      this.currentUser.email = this.userForm.value.email;
      const status = this.userForm.value.status === 'false' ? 1 : 0;
      this.currentUser.status = status;
      this.currentUser.idRoles = this.getCheckData();
      console.log(this.currentUser);
      this.cancelForm(true);
   }
}

function minSelectedCheckboxes(min = 1): ValidatorFn {
   const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
         // get a list of checkbox values (boolean)
         .map((control) => control.value)
         // total up the number of checked checkboxes
         .reduce((prev, next) => (next ? prev + next : prev), 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
   };

   return validator;
}
