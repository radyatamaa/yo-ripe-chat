import { Injectable } from '@nestjs/common';
import { Message } from '../../core/entities';
import { IDataMongoServices } from '../../core/abstracts';
import { MessageFactoryService } from './message-factory.service';
import { CreateMessageDto } from '../../core/dtos';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MessageUseCases {
  constructor(
    private dataServices: IDataMongoServices,
    private messageFactoryService: MessageFactoryService,
  ) {}

  async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const message = this.messageFactoryService.createNewMessage(createMessageDto);
    return await this.dataServices.messages.create(message);
  }

  async getMessages(
    userId: number,
    toUserId: number,
  ): Promise<Message[]> {
    return await this.dataServices.messages.getAll({
        $or:[
            {
                $and:[ { fromUserId: userId }, { toUserId: toUserId } ]
            },
            {
                $and:[ { fromUserId: toUserId }, { toUserId: userId } ]
            }
        ],
        sort: {'_id': 1}
    });
  }

  async mkdirSyncRecursive(directory){
    var dir = directory.replace(/\/$/, '').split('/');
    for (var i = 1; i <= dir.length; i++) {
        var segment =  path.basename('uploads') + "/" + dir.slice(0, i).join('/');
        !fs.existsSync(segment) ? fs.mkdirSync(segment) : null ;
    }
  }
}
