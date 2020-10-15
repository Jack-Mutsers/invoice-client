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
        public name: string = null,
        public address: string = null,
        public zipcode: string = null,
        public city: string = null,
        public po_box: string = null
    ) {  }
}