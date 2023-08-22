import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Entity } from 'typeorm';
import { IDataMysqlServices } from '../../../core';
import { MysqlGenericRepository } from './mysql-generic-repository';
import {
  User,
} from './model';

@Injectable()
export class MysqlDataServices
  implements IDataMysqlServices, OnApplicationBootstrap
{
  users: MysqlGenericRepository<User>;

  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MysqlGenericRepository<User>(this.UserRepository);
  }
}
