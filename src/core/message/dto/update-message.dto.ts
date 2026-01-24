import { Injectable } from "@nestjs/common";
import { PartialType } from "@nestjs/mapped-types";
import { CreateMessageDTO } from "./create-message.dto";

@Injectable()
export class UpdateMessageDTO extends PartialType(CreateMessageDTO){
    message: String;
}