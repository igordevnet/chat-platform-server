import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
    handleNewMessage(client: Socket, message: string) {
        console.log(`Message from ${client.id}: ${message}`);
        
        client.broadcast.emit("reply", {
            sender: client.id,
            message: message
        });

    }

}