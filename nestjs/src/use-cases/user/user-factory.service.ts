import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities';

@Injectable()
export class UserFactoryService {
  updateUserOnline(user: User,userSocketId: string) {
    user.socket_id = userSocketId;
    user.online = 'Y';

    return user;
  }

  updateUserOffline(user: User,userSocketId: string) {
    user.socket_id = userSocketId;
    user.online = 'N';

    return user;
  }
}
