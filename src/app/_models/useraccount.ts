import { User } from './user';

export interface IUseraccount{
    id: number;
    username: string;
    password: string;
    userId: number;
    user: User;
}

export class UserAccount implements IUseraccount{
    id = 0;
    username = null;
    password = null;
    userId = 0;
    user = new User();

    public loadFromObject(object){
        this.id = object.id;
        this.username = object.username;
        this.userId = object.userId;
        this.user = object.user;
    }

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