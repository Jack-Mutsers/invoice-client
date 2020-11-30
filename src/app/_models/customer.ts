export interface ICustomer{
    id: number;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    companyId: number
}

export class Customer implements ICustomer{
    id = 0;
    name = null;
    address = null;
    zipcode = null;
    city = null;
    companyId = 0;
}