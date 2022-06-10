import { BaseEntity } from './base.entity';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  ObjectID,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BadGatewayException } from '@nestjs/common';

export class BaseService<Entity> {
  constructor(private entitiesRepository: Repository<Entity>) {}

  findOneByCondition(
    condition: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity> {
    try {
      return this.entitiesRepository.findOneBy(condition);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findAllByCondition(condition: FindManyOptions<Entity>) {
    try {
      return this.entitiesRepository.find(condition);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  createOne(createBody: DeepPartial<Entity>[]): Promise<DeepPartial<Entity>[]> {
    try {
      return this.entitiesRepository.save(createBody);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  removeOneByCondition(
    condition:
      | string
      | number
      | FindOptionsWhere<Entity>
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[],
  ): Promise<DeleteResult> {
    try {
      return this.entitiesRepository.delete(condition);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  updateOneByCondition(
    condition:
      | string
      | number
      | FindOptionsWhere<Entity>
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[],
    updateBody: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    try {
      return this.entitiesRepository.update(condition, updateBody);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
