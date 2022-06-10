import {
  Body,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';
import { DeepPartial, DeleteResult, Entity, UpdateResult } from 'typeorm';
import { BaseService } from './base.service';

export class BaseController<Entity> {
  constructor(private baseService: BaseService<Entity>) {}

  @ApiHeader({
    name: 'x-tenant-id',
    description: 'The id of the tenant that the entities belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returns all the entities which belong to the tenant',
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'x-tenant-id' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  async findAllByCondition(@Req() request: Request): Promise<Entity[]> {
    return this.baseService.findAllByCondition({ ...request.configuration });
  }

  @ApiHeader({
    name: 'x-tenant-id',
    description: 'The id of the tenant that the entity belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description:
      'Returns the entity which matches the provided id and the given tenant.',
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'x-tenant-id' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the entity which is requested.',
    required: true,
  })
  @Get(':id')
  async findOneByCondition(@Req() request: Request): Promise<Entity> {
    return this.baseService.findOneByCondition({
      ...request.configuration,
      id: request.params.id,
    });
  }

  @ApiHeader({
    name: 'x-tenant-id',
    description: 'The id of the tenant that the resource will belong to.',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returns the newly created entity.',
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'x-tenant-id' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the entity which is requested.',
    required: true,
  })
  @ApiBody({
    type: Entity,
  })
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Req() request: Request,
    @Body() body: Entity,
  ): Promise<DeepPartial<Entity>[]> {
    return this.baseService.createOne({ ...body, ...request.configuration });
  }

  @ApiHeader({
    name: 'x-tenant-id',
    description: 'The id of the tenant that the resource belongs to.',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returns a success body',
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'x-tenant-id' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the entity which is requested.',
    required: true,
  })
  @Delete(':id')
  async deleteOneByCondition(@Req() request: Request): Promise<DeleteResult> {
    return this.baseService.removeOneByCondition({
      ...request.configuration,
      id: request.params.id,
    });
  }

  @ApiHeader({
    name: 'x-tenant-id',
    description: 'The id of the tenant that the resource belongs to.',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returns a success body',
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'x-tenant-id' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the entity which is requested.',
    required: true,
  })
  @ApiBody({
    type: Entity,
  })
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateOneByCondition(
    @Req() request: Request,
    @Body() body: Entity,
  ): Promise<UpdateResult> {
    return this.baseService.updateOneByCondition(
      { ...request.configuration, id: request.params.id },
      body,
    );
  }
}
