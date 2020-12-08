export interface IPasswordEditor{
    password: String;
    confirmPass: String;
}

export class PasswordEditor implements IPasswordEditor{
    password = "";
    confirmPass = "";
}