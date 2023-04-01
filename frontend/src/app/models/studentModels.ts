import { Company } from "./companyModels";

export interface Student {
    _id: string
    firstName: string;
    lastName:string;
    email: string;
    teacher: string;
    homeroomNumber: number;
    company: Company;
    grade: number;
    profileImage: string;
    gender: string;
    carTag: number;
    schoolIssuedId: string;
}
export interface RequestStudent {
    _id?: string
    firstName: string;
    lastName:string;
    email?:string
    teacher: string;
    homeroomNumber: number;
    company: string;
    grade: number;
    profileImage: string;
    gender: string;
    carTag: number;
    schoolIssuedId: string;
}