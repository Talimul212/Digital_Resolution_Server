export type UserType = 'client' | 'employee' | 'admin';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  createdBy?: string; // Admin ID
}
