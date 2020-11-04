export interface ICompany{
    id: number;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    telephoneNumber: string;
    contactCode: string;
    ownerId: number;
}

export class Company implements ICompany{
    id = 0;
    name = null;
    address = null;
    zipcode = null;
    city = null;
    telephoneNumber = null;
    contactCode = null;
    ownerId = 0;
}