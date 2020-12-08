import { User } from './user';
import { Company } from './company';

export interface IUseraccount{
    id: number;
    username: string;
    password: string;
    contactCode: string;
    user: User;
    companyId: number;
    company: Company;
    token?: string;
}

export class UserAccount implements IUseraccount{
    id = 0;
    username = null;
    password = "";
    contactCode = null;
    user = new User();
    companyId = 0;
    company = new Company();
    role = null;
    token? = null;
 
    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.username = object.username;
        this.contactCode = object.contactCode;
        this.user = object.user;
        this.companyId = object.companyId;
        this.company = object.company;
        this.role = object.role;
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