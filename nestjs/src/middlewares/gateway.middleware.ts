import { Injectable, NestMiddleware } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserUseCases } from '../use-cases/user/user.use-case';

@Injectable()
export class WebSocketPreInitMiddleware implements NestMiddleware {
  constructor(private userUseCases: UserUseCases) {}

  async use(socket: any, next: () => void) {
    const userId = socket.query.id;
    const userSocketId = socket.query.t;
    const response = await this.userUseCases.addSocketId(Number(userId), userSocketId);

    if (response && response !== null) {
      next();
    } else {
      console.error(`Socket connection failed for user ID ${userId}.`);
    }
  }
}
