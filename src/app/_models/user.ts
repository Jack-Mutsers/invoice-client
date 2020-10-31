export interface IUser{
    id: number;
    name: string;
    address: string;
    zipcode: string;
    city: string;
}

export class User implements IUser{
    id = 0;
    name = null;
    address = null;
    zipcode = null;
    city = null;
}