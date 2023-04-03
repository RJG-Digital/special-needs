import { Company } from "./companyModels";

export interface RequestCompanyService {
    company: string;
    name: string;
    color: string;
    description: string;
}

export interface ResponseCompanyService {
    company: Company;
    name: string;
    color: string;
    description: string;
}