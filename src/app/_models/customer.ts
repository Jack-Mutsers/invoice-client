export class Customer{
    constructor(
        public id: number = 0,
        public name: string,
        public address: string,
        public zipcode: string,
        public city: string,
    ) {  }
}