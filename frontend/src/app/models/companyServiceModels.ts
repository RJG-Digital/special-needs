import { Company } from "./companyModels";

export interface RequestCompanyService {
    name: string;
    color: string;
    description: string;
}

export interface ResponseCompanyService {
    _id: string
    company: Company;
    name: string;
    color: string;
    description: string;
}