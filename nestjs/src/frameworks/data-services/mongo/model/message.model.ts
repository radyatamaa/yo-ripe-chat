import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  fromUserId: number;

  @Prop()
  toUserId: number;

  @Prop()
  type: string;

  @Prop()
  fileFormat: string;

  @Prop()
  filePath: string;

  @Prop()
  message: string;

  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop()
  ip: string;

  @Prop()
  deletedAt: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
