export interface IFileRecord{
    id: number;
    name: string;
    url: string;
    fileType: string;
    creationDate: string;
    contactCode: String;
    ownerId: number;
}

export class FileRecord implements IFileRecord{
    id = 0;
    name = null;
    url = null;
    fileType = null;
    creationDate = null;
    contactCode = "";
    ownerId = 0;
 
    // load from api response
    public loadFromObject(object){
        this.id = object.id;
        this.name = object.name;
        this.url = object.url;
        this.fileType = object.fileType;
        this.creationDate = object.creationDate;
        this.contactCode = object.contactCode;
        this.ownerId = object.ownerId;
    }

    // load with html form data
    public loadFromForm(object){ 
        this.name = object.name;
        this.contactCode = object.contactCode;
    }
}