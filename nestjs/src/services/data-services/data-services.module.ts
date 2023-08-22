import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../frameworks/data-services/mongo/mongo-data-services.module';
import { MysqlDataServicesModule } from '../../frameworks/data-services/mysql/mysql-data-services.module';

@Module({
  imports: [ MysqlDataServicesModule, MongoDataServicesModule],
  exports: [ MysqlDataServicesModule, MongoDataServicesModule],
})
export class DataServicesModule {}
