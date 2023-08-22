import { User, Message } from '../entities';
import { IGenericMongoRepository, IGenericMysqlRepository } from './generic-repository.abstract';

export abstract class IDataMysqlServices {
  abstract users: IGenericMysqlRepository<User>;
}

export abstract class IDataMongoServices {
  abstract messages: IGenericMongoRepository<Message>;
}
