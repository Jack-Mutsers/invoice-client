import { Company } from './company';
import { Customer } from './customer';

export interface IFileRecord{
    id: number;
    name: string;
    url: string;
    fileType: string;
    creationDate: string;
    customerId: number;
    customer: Customer;
    ownerId: number;
    owner: Company;
}

export class FileRecord implements IFileRecord{
    id = 0;
    name = null;
    url = null;
    fileType = null;
    creationDate = null;
    customerId = 0;
    customer = new Customer();
    ownerId = 0;
    owner = new Company();
 
    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.name = object.name;
        this.url = object.url;
        this.fileType = object.fileType;
        this.creationDate = object.creationDate;
        this.customerId = object.customerId;
        this.customer = object.customer;
        this.ownerId = object.ownerId;
        this.owner = object.owner;
    }

    // load with html form data
    public loadFromForm(object){ 
        this.name = object.name;
        this.customerId = object.customerId;
    }
}