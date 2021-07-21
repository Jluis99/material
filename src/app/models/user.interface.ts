import { RoleI } from './rol.interface';
export interface UserI {
   name: string;
   lastName: string;
   email: string;
   status: number;
   id?: number;
   password?: string;
   createdAt?: Date;
   updatedAt?: Date;
   idRoles?: number[];
}
