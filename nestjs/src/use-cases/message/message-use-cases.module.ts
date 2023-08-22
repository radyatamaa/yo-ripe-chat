import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { MessageFactoryService } from './message-factory.service';
import { MessageUseCases } from './message.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [MessageFactoryService, MessageUseCases],
  exports: [MessageFactoryService, MessageUseCases],
})
export class MessageUseCasesModule {}
