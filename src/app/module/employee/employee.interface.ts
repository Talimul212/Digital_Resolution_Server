export type DepartmentType =
  | 'marketer'
  | 'web_developer'
  | 'graphic_designer'
  | 'video_editor'
  | 'admin'
  | 'team_lead';

export interface ITask {
  companyName: string;
  details: string;
  hour: number;
  status?: 'pending' | 'in_progress' | 'completed';
}

export interface IEmployee {
  companyID: string;
  name: string;
  number: string;
  email: string;
  department: DepartmentType;
  designation: string;
  address: string;
  nid: string;
  photo: string;
  salary: string;
  joiningDate: Date;
  task: ITask[];
}
