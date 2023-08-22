export abstract class IGenericMysqlRepository<T> {
  abstract getAll(filters?: any): Promise<T[]>;

  abstract getWithFilter(filters: any): Promise<T>;

  abstract get(id: any): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id:any,item: T);
}

export abstract class IGenericMongoRepository<T> {
  abstract getAll(args?: any): Promise<T[]>;

  abstract get(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);
}