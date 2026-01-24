import { Message } from "./message";

export interface AuthMessage extends Message {
    token: String;
    email: String;
    name: String;
}