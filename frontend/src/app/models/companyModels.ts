export interface Company {
    _id?:string
    name: string;
    colors: CompanyColor[];
    website: string;
    logo: string;
    userRoles: UserRole [];
}
export interface UserRole {
    number: number;
    name: string;
    canCreateUsers: boolean;
    canCreateSchedules: boolean;
    canCreateStudents: boolean;
    canViewStudents: boolean;
    canViewSchedules: boolean;
    canViewUsers: boolean;
}
export interface CompanyColor {
    primary: string;
    accent: string;
    warn: string;
}