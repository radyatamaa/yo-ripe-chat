import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {  Logger } from '@nestjs/common';
import { UserUseCases } from '../use-cases/user/user.use-case'
import { MessageUseCases } from '../use-cases/message/message.use-case';
import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { CreateMessageDto } from '../core/dtos';
import { join } from 'path';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    // private userUseCases: UserUseCases;
    // private messageUseCases: MessageUseCases;
    private logger: Logger = new Logger('ChatGateway');
    constructor(
        private userUseCases: UserUseCases,
        private messageUseCases: MessageUseCases
      ) {}
      
	@WebSocketServer() wss: Server;

	afterInit(server: any) {
		this.logger.log('Initialize ChatGateway!');
	}

	async handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
	}

	async handleDisconnect(client: Socket) {
        const isLoggedOut = await this.userUseCases.logoutUser(client.id);
        client.broadcast.emit('chatListRes', {
            userDisconnected: true,
            socket_id: client.id
        });
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('chatList')
	async handleChatList(client: Socket, userId: number) {
		try { 
            const result = await this.userUseCases.getChatList(userId);
            this.wss.to(client.id).emit('chatListRes', {
                userConnected: false,
                chatList: result
            });

            client.broadcast.emit('chatListRes', {
                userConnected: true,
                userId: userId,
                socket_id: client.id
            });

		} catch(err) {
			console.log(err);
		}
	}

	@SubscribeMessage('getMessages')
	async handleGetMessages(client: Socket, data: any) {
        try { 
            const result = await this.messageUseCases.getMessages(data.fromUserId, data.toUserId);
            if (result.length === 0) {
                this.wss.to(client.id).emit('getMessagesResponse', {result:[],toUserId:data.toUserId});
            }else {
                this.wss.to(client.id).emit('getMessagesResponse', {result:result,toUserId:data.toUserId});
            }

		} catch(err) {
			console.log(err);
		}

	}

	@SubscribeMessage('addMessage')
	async handleAddMessage(client: Socket, response: any) {
        try { 
            response.date = moment().format("Y-MM-D");
            response.time = moment().format("hh:mm A");
            this.messageUseCases.createMessage({
                type: response.type,
                fileFormat: response.fileFormat,
                filePath: response.filePath,
                fromUserId: response.fromUserId,
                toUserId: response.toUserId,
                message: response.message,
                date: response.date,
                time: response.time,
                ip: client.request.connection.remoteAddress
            } as CreateMessageDto);
            client.to(response.toSocketId).emit('addMessageResponse', response);

		} catch(err) {
			console.log(err);
		}

	}

    @SubscribeMessage('typing')
	handleTyping(client: Socket, data: any) {
        try { 
            client.to(data.socket_id).emit('typing', {typing:data.typing, to_socket_id:client.id});
		} catch(err) {
			console.log(err);
		}

	}

    @SubscribeMessage('upload-image')
	async handleUploadImage(client: Socket, response: any) {
        try { 

            const basePath = join(__dirname, '..', '..');
            let dir = moment().format("D-M-Y")+ "/" + moment().format('x') + "/" + response.fromUserId
            

            await this.messageUseCases.mkdirSyncRecursive(dir);
            let filepath = dir + "/" + response.fileName;
            var writer = fs.createWriteStream(basePath + '/' + path.basename('uploads') + "/" + filepath, { encoding: 'base64'});
            writer.write(response.message);
            writer.end();
            writer.on('finish', function () {
                response.message = response.fileName;
                response.filePath = filepath;
                response.date = moment().format("Y-MM-D");
                response.time = moment().format("hh:mm A");
                this.messageUseCases.createMessage({
                    type: response.type,
                    fileFormat: response.fileFormat,
                    filePath: response.filePath,
                    fromUserId: response.fromUserId,
                    toUserId: response.toUserId,
                    message: response.message,
                    date: response.date,
                    time: response.time,
                    ip: client.request.connection.remoteAddress
                } as CreateMessageDto);
                client.to(response.toSocketId).emit('addMessageResponse', response);
                client.emit('image-uploaded', response);
            }.bind(this));

		} catch(err) {
			console.log(err);
		}

	}
}