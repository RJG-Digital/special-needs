import { ResponseCompanyService } from './companyServiceModels';
import { Student } from './studentModels';

export interface RequestStudentService {
  _id?: string;
  student: string;
  service: string;
}
export interface ResponseStudentService {
  _id?: string;
  student: Student;
  service: ResponseCompanyService;
  minutesAssigned: number;
  minutesUsed: number;
  minutesLeft: number;
}

export interface StudentServiceTableMeta {
  assigned: boolean;
  color: string;
  serviceId: string;
  minutesAssigned: number;
  minutesLeft: number;
  minutesUsed: number;
  name: string;
}
