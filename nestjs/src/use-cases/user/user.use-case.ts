import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities';
import { IDataMysqlServices } from '../../core/abstracts';
import { UserFactoryService } from './user-factory.service';
import { Not, MoreThan, Equal } from "typeorm"

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IDataMysqlServices,
    private userFactoryService: UserFactoryService,
  ) {}

  async getChatList(
    userId: number,
  ): Promise<User[]> {
    return await this.dataServices.users.getAll({
      where: {
        id: Not(Equal(userId))
      }
    });
  }

  async addSocketId(
    userId: number,
    userSocketId: string,
  ): Promise<User> {
    const user = await this.dataServices.users.get(userId);
    if (user) {
      const updateUser = this.userFactoryService.updateUserOnline(user,userSocketId);
      await this.dataServices.users.update(userId,updateUser);  
    }
    return user;
  }

  async logoutUser(
    userSocketId: string,
  ): Promise<User> {
    const user = await this.dataServices.users.getWithFilter({
      where: {
        socketId: userSocketId
      }
    });
    if (user) {
      const updateUser = await this.userFactoryService.updateUserOffline(user,userSocketId);
      return this.dataServices.users.update(user.id,updateUser);  
    }

    return null;
  }
}
