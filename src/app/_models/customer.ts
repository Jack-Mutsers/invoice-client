// export interface Product{
//     id: number;
//     name: string;
//     address: string;
//     zipcode: string;
//     city: string;
// }

export class Customer{
    constructor(
        public id: number = 0,
        public name: string = null,
        public address: string = null,
        public zipcode: string = null,
        public city: string = null
    ) {  }
}