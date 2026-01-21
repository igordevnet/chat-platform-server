import { Message } from "./message";

export class AuthMessage extends Message {
    token: String;
    email: String;
    name: String;
}