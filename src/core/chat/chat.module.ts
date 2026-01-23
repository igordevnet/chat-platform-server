import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { MessageModule } from "../message/message.module";
import { ChatRepository } from "./repositories/chat.repository";
import { ChatService } from "./chat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./entities/chat.entity";
import { ChatController } from "./chat.controller";

@Module({
    imports: [
        MessageModule, 
        MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}])
    ],
    controllers: [ChatController],
    providers: [
        ChatGateway,
        ChatRepository,
        ChatService
    ],
})
export class ChatModule { }