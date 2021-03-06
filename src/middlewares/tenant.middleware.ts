import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantsService: TenantsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];

    try {
      if (!tenantId) {
        return res.status(403).send({
          statusCode: 403,
          message: "'x-tenant-id' is not provided as a header.",
        });
      }

      const tenant = await this.tenantsService.getOneById(tenantId as string);

      if (!tenant) {
        return res.status(404).send({
          statusCode: 404,
          message: `Tenant with id: '${tenantId}' not found.`,
        });
      }

      req.configuration = { tenant };

      next();
    } catch (error: any) {
      return res.status(404).send({
        statusCode: 404,
        message: `Tenant with id: '${tenantId}' not found.`,
      });
    }
  }
}
