import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";
import { MessageModule } from "./message/message.module";

@Module({
    imports: [UserModule, ChatModule, MessageModule]
})
export class CoreModule { }