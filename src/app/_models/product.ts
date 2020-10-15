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
        public name: string = null,
        public price: number = null,
        public categoryId: number = 0,
        public productCode: string = null,
        public category: ProductCategory = new ProductCategory()
    ) {  }
}