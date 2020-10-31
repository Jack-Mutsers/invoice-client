export interface IMessage{
    id: number;
    userId: number;
    contactCode: string;
    message: string;
    type: string;
}

export class Message implements IMessage{
    id = 0;
    userId = 0;
    contactCode = null;
    message = null;
    type = null;
}