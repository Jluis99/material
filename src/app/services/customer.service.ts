import { CustomerI } from './../models/custumer.interface';
import { Injectable } from '@angular/core';

import {
   AngularFirestore,
   AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class CustomerService {
   private customerCollection: AngularFirestoreCollection<CustomerI>;
   customers: Observable<CustomerI[]>;

   constructor(private readonly afs: AngularFirestore) {
      this.customerCollection = afs.collection<CustomerI>('customers');
      this.customers = this.customerCollection.snapshotChanges().pipe(
         map((actions) =>
            actions.map((a) => {
               const data = a.payload.doc.data() as CustomerI;
               const id = a.payload.doc.id;
               return { id, ...data };
            })
         )
      );
   }

   getAllCustumers() {
      return this.customers;
   }

   deleteCustomer(id: string) {
      this.customerCollection.doc(id).delete();
   }

   addCustomer(customer: CustomerI) {
      return this.customerCollection.add(customer);
   }

   updateCustomer(customer: CustomerI) {
      return this.customerCollection.doc(customer.id).update(customer);
   }
}
