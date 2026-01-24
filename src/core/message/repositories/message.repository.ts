import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "../entities/message.entity";
import { Model } from "mongoose";
import { CreateMessageDTO } from "../dto/create-message.dto";
import { UpdateMessageDTO } from "../dto/update-message.dto";

@Injectable()
export class MessageRepository {
    public constructor(@InjectModel('Message')
    private readonly messageModel: Model<Message>
    ) { }

    async createMessage(createMessageDto: CreateMessageDTO): Promise<Message> {
        const createdMessage = new this.messageModel(createMessageDto);
        return createdMessage.save();
    }

    async updateMessage(id: string, updateMessageDto: UpdateMessageDTO): Promise<Message | null> {
        return this.messageModel.findByIdAndUpdate(id, updateMessageDto).exec();
    }

    async deleteMessage(id: string): Promise<void> {
        await this.messageModel.findByIdAndDelete(id).exec();
    }

    async findMessageById(id: string): Promise<Message | null> {
        return await this.messageModel.findById(id).exec();
    }

    async loadMessages(chatId: string): Promise<Message[] | null> {
        return await this.messageModel.find({chatId}).exec();
    }
}