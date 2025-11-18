export type EmployeeType =
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
}

export interface IEmployee {
  name: string;
  designation: string;
  task: ITask[];
  joinDate: Date;
  employeeType: EmployeeType;
}
