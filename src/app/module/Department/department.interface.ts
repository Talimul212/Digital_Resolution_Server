export type NameType =
  | 'Marketing'
  | 'Web Development'
  | 'Graphic Design'
  | 'Video Editing'
  | 'Admin Services';
export type TDepartment = {
  name: NameType;
  clientIds: string[];
  employeeIds: string[];
};
