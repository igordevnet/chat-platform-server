import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./repositories/message.repository";
import { Message } from "./entities/message.entity";
import { CreateMessageDTO } from "./dto/create-message.dto";
import { UpdateMessageDTO } from "./dto/update-message.dto";

@Injectable()
export class MessageService {
    public constructor(private readonly messageRepository: MessageRepository) { }

    async createMessage(dto: CreateMessageDTO): Promise<Message> {
        return this.messageRepository.createMessage(dto);
    }

    async updateMessage(id: string, dto: UpdateMessageDTO): Promise<Message | null> {
        return this.messageRepository.updateMessage(id, dto);
    }

    async deleteMessage(id: string) {
        return this.messageRepository.deleteMessage(id);
    }
}