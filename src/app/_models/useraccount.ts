import { User } from './user';
import { Company } from './company';

export interface IUseraccount{
    id: number;
    username: string;
    password: string;
    contactCode: string;
    user: User;
    company: Company;
    token?: string;
}

export class UserAccount implements IUseraccount{
    id = 0;
    username = null;
    password = null;
    contactCode = null;
    user = new User();
    company = new Company();
    token? = null;
 
    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.username = object.username;
        this.contactCode = object.contactCode;
        this.user = object.user;
        this.company = object.company;
    }

    // load with html form data
    public loadFromForm(object){ 
        this.username = object.username;
        this.password = object.password;

        var user = new User();
        user.name = object.name;
        user.address = object.address;
        user.city = object.city;
        user.zipcode = object.zipcode;

        this.user = user;
    }
}