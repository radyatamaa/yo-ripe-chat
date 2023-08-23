import { INestApplicationContext, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { UserUseCases } from '../use-cases/user/user.use-case';


export class MyIoAdapter extends IoAdapter {
  private userUseCases: UserUseCases;

  constructor(private app: INestApplicationContext) {
    super(app);
    app.resolve<UserUseCases>(UserUseCases).then((userUseCases) => {
      this.userUseCases = userUseCases;
    });
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    
    server.use(async (socket, next) => {
      let userId = socket.request._query['id'];
      let userSocketId = socket.id;
      
      if (userId) {
        const response = await this.userUseCases.addSocketId(Number(userId), userSocketId);

        if (response && response !== null) {
          next();
        } else {
          console.error(`Socket connection failed for user ID ${userId}.`);
        }
  
      }

      console.error(`Socket connection failed for user ID ${userId}.`);
    });

    return server;
  }
}