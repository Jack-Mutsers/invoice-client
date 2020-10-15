import { User } from './user';

export interface IUseraccount{
    id: number;
    username: string;
    password: string;
    userId: number;
    user: User;
}

export class UserAccount implements IUseraccount{
    constructor(
        public id: number = 0,
        public username: string = null,
        public password: string = null,
        public userId: number = 0,
        public user: User = new User()
    ) {  }

    public loadFromObject(object){
        this.id = object.id;
        this.username = object.username;
        this.userId = object.userId;
        this.user = object.user;
    }
}