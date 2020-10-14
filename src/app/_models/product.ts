import { ProductCategory } from './productcategory';

// export interface Product{
//     id: number;
//     name: string;
//     price: number;
//     categoryId: number;
//     productCode: string;
//     category: ProductCategory;
// }

export class Product{
    constructor(
        public id: number = 0,
        public name: string,
        public price: number,
        public categoryId: number,
        public productCode: string,
        public category: ProductCategory,
    ) {  }
}