import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  AppController,
} from './controllers';
import { 
  AppGateway,
  ChatGateway,
} from './gateway';
import { WebSocketPreInitMiddleware } from './middlewares/gateway.middleware';
import { DataServicesModule } from './services/data-services/data-services.module';
import { MessageUseCasesModule } from './use-cases/message/message-use-cases.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';

@Module({
  imports: [
    DataServicesModule,
    MessageUseCasesModule,
    UserUseCasesModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppGateway, ChatGateway],
})

export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(WebSocketPreInitMiddleware)
//       .forRoutes('*'); // Apply the middleware to all routes
//   }
// }