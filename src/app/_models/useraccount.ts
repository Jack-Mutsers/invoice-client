import { User } from './user';

// export interface Useraccount{
//     id: number;
//     username: string;
//     password: string;
//     userId: number;
//     user: User;
// }

export class UserAccount{
    constructor(
        // public id: number = 0,
        public username: string = null,
        public password: string = null
        // public userId: number = 0,
        // public user: User = new User()
    ) {  }
}