export interface IInvoice{
    id: number;
    name: string;
    url: string;
    contactCode: String;
}

export class Invoice implements IInvoice{
    id = 0;
    name = null;
    url = null;
    contactCode = null;
}