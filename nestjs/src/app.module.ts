import { MiddlewareConsumer, Module, RequestMethod  } from '@nestjs/common';
import {
  AppController,
} from './controllers';
import { 
  ChatGateway,
} from './gateway';
// import { WebSocketPreInitMiddleware } from './middlewares/gateway.middleware';
import { DataServicesModule } from './services/data-services/data-services.module';
import { MessageUseCasesModule } from './use-cases/message/message-use-cases.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import * as express from 'express';

@Module({
  imports: [
    DataServicesModule,
    MessageUseCasesModule,
    UserUseCasesModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [ChatGateway],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(__dirname + '/uploads'))
      .forRoutes({ path: '', method: RequestMethod.GET });
  }
}