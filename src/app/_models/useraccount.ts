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
        public id: number = 0,
        public username: string,
        public password: string,
        public userId: number,
        public user: User,
    ) {  }
}