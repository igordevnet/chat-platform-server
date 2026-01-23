import { Injectable } from "@nestjs/common";
import { CreateChatDTO } from "./dto/create-chat.dto";
import { ChatRepository } from "./repositories/chat.repository";
import { Chat } from "./entities/chat.entity";
import { UpdateChatDTO } from "./dto/update-chat.dto";

@Injectable()
export class ChatService {
    public constructor(private readonly chatRepository: ChatRepository) { }

    async createChat(dto: CreateChatDTO): Promise<Chat> {
        return this.chatRepository.createChat(dto);
    }

    async updateChat(id: string, dto: UpdateChatDTO): Promise<Chat | null> {
        return this.chatRepository.updateChat(id, dto);
    }

    async deleteChat(id: string): Promise<void> {
        await this.chatRepository.deleteChat(id);
    }
}