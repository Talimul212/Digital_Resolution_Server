export type UserType =
  | 'suber_admin'
  | 'marketer'
  | 'web_developer'
  | 'graphic_designer'
  | 'video_editor'
  | 'admin'
  | 'team_lead';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  employeeId: string;
  userType: UserType;
  createdBy?: string; // Admin ID
}
