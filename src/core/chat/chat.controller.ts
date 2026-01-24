import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateChatDTO } from "./dto/create-chat.dto";
import { Chat } from "./entities/chat.entity";
import { ChatService } from "./chat.service";
import { UpdateChatDTO } from "./dto/update-chat.dto";
import { AuthGuard } from "src/shared/modules/auth/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('Chat')
export class ChatController {

    public constructor(private readonly chatService: ChatService) {}

    @Post()
    async createChat(@Body() createChatDto: CreateChatDTO): Promise<Chat> {
        return this.chatService.createChat(createChatDto);
    }

    @Patch(':id')
    async updateChat(@Param('id') id: string, @Body() updateChatDto: UpdateChatDTO): Promise<Chat | null> {
        return this.chatService.updateChat(id, updateChatDto);
    }

    @Delete(':id')
    async deleteChat(@Param('id') id: string): Promise<void> {
        await this.chatService.deleteChat(id);
    }

    @Get(':id')
    async getChatByUserId(@Param('id') userId: string): Promise<Chat[] | null> {
        return await this.chatService.getChatByUserId(userId);
    }
}