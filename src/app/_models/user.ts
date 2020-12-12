export interface IUser{
    id: number;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    contactCode: string;
}

export class User implements IUser{
    id = 0;
    name = null;
    address = null;
    zipcode = null;
    city = null;
    contactCode = "";

    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.name = object.name;
        this.address = object.address;
        this.zipcode = object.zipcode;
        this.city = object.city;
        this.contactCode = object.contactCode;
    }
}