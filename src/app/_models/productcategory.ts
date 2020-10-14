// export interface ProductCategory{
//     id: number;
//     name: string;
//     btw: number;
// }

export class ProductCategory{
    constructor(
        public id: number = 0,
        public name: string,
        public btw: number
    ) {  }
}