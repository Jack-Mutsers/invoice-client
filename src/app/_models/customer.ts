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
        public name: string,
        public address: string,
        public zipcode: string,
        public city: string,
    ) {  }
}