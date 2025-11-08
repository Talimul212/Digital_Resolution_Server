export type NameType =
  | 'Marketing'
  | 'Web Development'
  | 'Graphic Design'
  | 'Video Editing';
export type TDepartment = {
  name: NameType;
  clientIds: string[];
  employeeIds: string[];
};
