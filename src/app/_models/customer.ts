export interface ICustomer{
    id: number;
    name: string;
    address: string;
    zipcode: string;
    city: string;
}

export class Customer implements ICustomer{
    id = 0;
    name = null;
    address = null;
    zipcode = null;
    city = null;
}