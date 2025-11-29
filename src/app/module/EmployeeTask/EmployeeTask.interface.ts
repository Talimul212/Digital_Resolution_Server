export type AttendanceStatus = 'present' | 'absent' | 'leave';

export interface BaseTask {
  employeeId: string; // reference to Employee
  role: 'web_developer' | 'graphic_designer' | 'video_editor' | 'marketor';
  attendance: AttendanceStatus;
}

export interface DeveloperTask extends BaseTask {
  role: 'web_developer';
  companyName: string;
  date: Date;
  projectDetails: string;
  stringOfWebsites: string;
  hours: string;
}

export interface GraphicDesignerTask extends BaseTask {
  role: 'graphic_designer';
  date: Date;
  workDetails: string;
  companies: string[]; // multiple companies
  stringOfDesigns: string;
  hours: string;
}

export interface VideoEditorTask extends BaseTask {
  role: 'video_editor';
  date: Date;
  workDetails: string;
  company: string;
  stringOfVideos: string;
  hours: string;
}

export interface MarketorTask extends BaseTask {
  role: 'marketor';
  date: Date;
  workDetails: string;
  company: string;
  adsPlatform: string;
  stringOfPlatforms: string;
}

export type ITask =
  | DeveloperTask
  | GraphicDesignerTask
  | VideoEditorTask
  | MarketorTask;
