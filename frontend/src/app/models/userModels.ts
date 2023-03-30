import { Company } from "./companyModels";

export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    title?: string;
    password?: string;
    token?: string;
    role?: number;
    company?: Company
    profileImage?: string;
}

export interface RequestUser {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    title?: string;
    password?: string;
    token?: string;
    role?: number;
    company?: string;
    profileImage?: string;
}