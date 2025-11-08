export type UserType =
  | 'client'
  | 'marketer'
  | 'web_developer'
  | 'graphic_designer'
  | 'video_editor'
  | 'admin';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  createdBy?: string; // Admin ID
}
