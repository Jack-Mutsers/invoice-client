import { ProductCategory } from './productcategory';

export interface Product{
    id: number;
    name: string;
    price: number;
    categoryId: number;
    productCode: string;
    category: ProductCategory;
}