import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { MessageService } from "../message/message.service";
import { Body } from "@nestjs/common";
import { CreateMessageDTO } from "../message/dto/create-message.dto";

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    public constructor(private readonly messageService: MessageService) { }

    @WebSocketServer() server: Server

    handleConnection(client: any, ...args: any[]) {
        console.log("New user connected...", client.id);

        client.broadcast.emit("user-joined", {
            message: `New User Joined the Chat: ${client.id}`
        })
    }

    handleDisconnect(client: any) {
        console.log("User disconnected...", client.id)
    }

    @SubscribeMessage('newMessage')
    handleNewMessage(
        client: Socket, payload: { recipient: string, message: string },
    ) {
        console.log(`Message from ${client.id}: ${payload.message}`);

        this.messageService.createMessage({
            sender: client.id,
            chatId: payload.recipient,
            message: payload.message,
        });

        client.broadcast.emit('reply', {
            sender: client.id,
            message: payload.message,
        });
    }

}