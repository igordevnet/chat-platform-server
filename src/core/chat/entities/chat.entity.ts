import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Chat extends Document {
    @Prop({ default: 'direct'})
    type: 'direct' | 'group';

    @Prop({required: true})
    participants: string[];

    @Prop()
    name?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);