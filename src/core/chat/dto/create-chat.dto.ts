import { IsArray, IsString } from "class-validator";

export class CreateChatDTO {
    type: 'direct' | 'group';

    @IsArray()
    participants: string[];

    @IsString()
    name?: string
}