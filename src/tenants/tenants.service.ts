import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/entities/Project/project.entity';
import { Tenant } from 'src/entities/Tenant/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  getOneById(tenantId: string) {
    return this.tenantsRepository.findOneBy({id: tenantId});
  }

  
}
