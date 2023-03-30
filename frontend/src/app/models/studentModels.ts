import { Company } from "./companyModels";

export interface Student {
    fristName: string;
    lastName:string;
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
    fristName: string;
    lastName:string;
    teacher: string;
    homeroomNumber: number;
    company: string;
    grade: number;
    profileImage: string;
    gender: string;
    carTag: number;
    schoolIssuedId: string;
}