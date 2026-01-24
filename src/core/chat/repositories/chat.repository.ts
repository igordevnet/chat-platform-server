import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat } from "../entities/chat.entity";
import { CreateChatDTO } from "../dto/create-chat.dto";
import { UpdateChatDTO } from "../dto/update-chat.dto";

@Injectable()
export class ChatRepository {
    public constructor(@InjectModel('Chat')
    private readonly chatModel: Model<Chat>) { }

    async createChat(createChatDto: CreateChatDTO): Promise<Chat> {
        const createdChat = new this.chatModel(createChatDto);
        return createdChat.save();
    }

    async updateChat(id: string ,updateChatDto: UpdateChatDTO): Promise<Chat | null> {
        return this.chatModel.findByIdAndUpdate(id, updateChatDto).exec();
    }

    async deleteChat(id: string): Promise<void> {
        await this.chatModel.findByIdAndDelete(id).exec();
    }

    async getChatByUserId(userId: string): Promise<Chat[] | null> {
        return await this.chatModel.find({ participants: userId }).exec();
    }
}
