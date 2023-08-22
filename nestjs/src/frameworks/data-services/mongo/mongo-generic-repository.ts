import { Model } from 'mongoose';
import { IGenericMongoRepository } from '../../../core';

export class MongoGenericRepository<T> implements IGenericMongoRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async getAll(args?: any): Promise<T[]> {
    return await this._repository.find(args).populate(this._populateOnFind).exec();
  }

  async get(id: any): Promise<T> {
    return await this._repository.findById(id).exec();
  }

  async create(item: T): Promise<T> {
    return await this._repository.create(item);
  }

  async update(id: string, item: T) {
    return await this._repository.findByIdAndUpdate(id, item);
  }
}
