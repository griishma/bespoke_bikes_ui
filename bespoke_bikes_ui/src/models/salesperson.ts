export interface SalesPerson {
    firstName: string;
    lastName: string;
    address?: string;
    phone?: string;
    startDate: Date;
    terminationDate?: Date;
    manager?: string;
}