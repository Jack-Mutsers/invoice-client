export interface IProductCategory{
    id: number;
    name: string;
    btw: number;
}

export class ProductCategory implements IProductCategory{
    id = 0;
    name = null;
    btw = null
}