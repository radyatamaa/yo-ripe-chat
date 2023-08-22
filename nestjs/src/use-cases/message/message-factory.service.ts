import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../../core/dtos';
import { Message } from '../../core/entities';
import * as moment from 'moment';
@Injectable()
export class MessageFactoryService {
  createNewMessage(createMessageDto: CreateMessageDto) {
    const newMessage = new Message();
    newMessage.type = createMessageDto.type;
    newMessage.fileFormat = createMessageDto.fileFormat;
    newMessage.filePath = createMessageDto.filePath;
    newMessage.fromUserId = createMessageDto.fromUserId;
    newMessage.toUserId = createMessageDto.toUserId;
    newMessage.message = createMessageDto.message;
    newMessage.date = createMessageDto.date;
    newMessage.time = createMessageDto.time;
    newMessage.ip = createMessageDto.ip;
    newMessage.createdAt = moment().toString();
    newMessage.updatedAt = moment().toString();
    return newMessage;
  }

}
