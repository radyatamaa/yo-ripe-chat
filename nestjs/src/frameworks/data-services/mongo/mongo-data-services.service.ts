import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataMongoServices } from '../../../core';
import { MongoGenericRepository } from './mongo-generic-repository';
import {
  Message,
  MessageDocument,
} from './model';

@Injectable()
export class MongoDataServices
  implements IDataMongoServices, OnApplicationBootstrap
{
  messages: MongoGenericRepository<Message>;

  constructor(
    @InjectModel(Message.name)
    private MessageRepository: Model<MessageDocument>,
  ) {}

  onApplicationBootstrap() {
    this.messages = new MongoGenericRepository<Message>(this.MessageRepository);
  }
}
