export interface IUser{
    id: number;
    name: string;
    address: string;
    zipcode: string;
    city: string;
}

export class User implements IUser{
    id = 0;
    name = null;
    address = null;
    zipcode = null;
    city = null;

    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.name = object.name;
        this.address = object.address;
        this.zipcode = object.zipcode;
        this.city = object.city;
    }
}