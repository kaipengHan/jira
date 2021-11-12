export interface Project {
  id: number;
  name: string;
  personId: number | string;
  pin: boolean;
  organization: string;
  created: number;
}
