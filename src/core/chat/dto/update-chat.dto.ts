import { PartialType } from "@nestjs/mapped-types";
import { CreateChatDTO } from "./create-chat.dto";

export class UpdateChatDTO extends PartialType(CreateChatDTO) {
    participants?: string[];
    name?: string;
}