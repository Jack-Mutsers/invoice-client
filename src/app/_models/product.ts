import { ProductCategory } from './productcategory';

export interface IProduct{
    id: number;
    name: string;
    price: number;
    categoryId: number;
    productCode: string;
    category: ProductCategory;
}

export class Product implements IProduct{
    id = 0;
    name = null;
    price = 0;
    categoryId = 0;
    productCode = null;
    category = new ProductCategory()
}