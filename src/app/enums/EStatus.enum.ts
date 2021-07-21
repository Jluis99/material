export class EStatus {

   static ACTIVE = new EStatus(0, 'Active');
   static INACTIVE = new EStatus(1, 'Inactive');

   static all(): Array<EStatus> {
      return Object.values(EStatus);
   }

   static result(id: number): EStatus {
      return EStatus.all().find(e => e.key === id);
   }

   private constructor(public readonly key: number, public readonly value: any) { }

   toString(): string {
      return this.key.toString();
   }
}
