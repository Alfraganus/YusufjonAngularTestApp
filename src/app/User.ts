export interface User {
  name: string;
  dateOfBirth: Date;
  neptunCode: string;
  roles: string[];
  password: string;
}


// role.model.ts
export enum Role {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Student = 'Student'
}
