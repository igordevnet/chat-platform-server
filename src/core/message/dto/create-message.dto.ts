import { IsString } from "class-validator";

export class CreateMessageDTO {
    @IsString()
    sender: string;

    @IsString()
    chatId: String;

    @IsString()
    message: String;
}