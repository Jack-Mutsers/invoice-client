export interface ICompany{
    id: number;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    telephoneNumber: string;
    contactCode: string;
    ownerId: number;
}

export class Company implements ICompany{
    id = 0;
    name = null;
    address = null;
    zipcode = null;
    city = null;
    telephoneNumber = null;
    contactCode = null;
    ownerId = 0;
 
    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.name = object.name;
        this.address = object.address;
        this.zipcode = object.zipcode;
        this.city = object.city;
        this.telephoneNumber = object.telephoneNumber;
        this.contactCode = object.contactCode;
        this.ownerId = object.ownerId;
    }

    // load with html form data
    public loadFromForm(object){ 
        this.id = object.id ? object.id : 0;
        this.name = object.name;
        this.address = object.address;
        this.zipcode = object.zipcode;
        this.city = object.city;
        this.telephoneNumber = object.telephoneNumber;
        this.contactCode = object.contactCode;
        this.ownerId = object.ownerId;
    }
}