// export interface User{
//     id: number;
//     name: string;
//     address: string;
//     zipcode: string;
//     city: string;
//     po_box: string;
// }

export class User{
    constructor(
        public id: number = 0,
        public name: string,
        public address: string,
        public zipcode: string,
        public city: string,
        public po_box: string,
    ) {  }
}