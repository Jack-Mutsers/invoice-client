export interface IFileRecord{
    id: number;
    name: string;
    url: string;
    fileType: string;
    creationDate: string;
    customerId: number;
    ownerId: number;
}

export class FileRecord implements IFileRecord{
    id = 0;
    name = null;
    url = null;
    fileType = null;
    creationDate = null;
    customerId = 0;
    ownerId = 0;
 
    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.name = object.name;
        this.url = object.url;
        this.fileType = object.fileType;
        this.creationDate = object.creationDate;
        this.customerId = object.customerId;
        this.ownerId = object.ownerId;
    }

    // load with html form data
    public loadFromForm(object){ 
        this.name = object.name;
        this.customerId = object.customerId;
    }
}