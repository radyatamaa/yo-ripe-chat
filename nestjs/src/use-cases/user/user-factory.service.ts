import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities';

@Injectable()
export class UserFactoryService {
  updateUserOnline(user: User,userSocketId: string) {
    user.socketId = userSocketId;
    user.online = 'Y';

    return user;
  }

  updateUserOffline(user: User,userSocketId: string) {
    user.socketId = userSocketId;
    user.online = 'N';

    return user;
  }
}
