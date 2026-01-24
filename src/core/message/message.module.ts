import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./entities/message.entity";
import { MessageRepository } from "./repositories/message.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    providers: [
        MessageService,
        MessageRepository
    ],
    exports: [MessageService]
})
export class MessageModule { }