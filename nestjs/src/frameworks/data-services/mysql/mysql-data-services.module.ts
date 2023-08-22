import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataMysqlServices } from '../../../core';
import { MYSQL_CONFIGURATION } from '../../../configuration';
import {
    User,
} from './model';
import { MysqlDataServices } from './mysql-data-services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: MYSQL_CONFIGURATION.host,
        port: MYSQL_CONFIGURATION.port,
        username: MYSQL_CONFIGURATION.user,
        password: MYSQL_CONFIGURATION.pass,
        database: MYSQL_CONFIGURATION.database,
        entities: [User],
        synchronize: true,
      }),
  ],
  providers: [
    {
      provide: IDataMysqlServices,
      useClass: MysqlDataServices,
    },
  ],
  exports: [IDataMysqlServices],
})
export class MysqlDataServicesModule {}
