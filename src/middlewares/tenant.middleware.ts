import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from 'src/tenants/tenants.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantsService: TenantsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers.tenantId || req.headers.tenantid;

    try {
      if (!tenantId) {
        return res.send({
          statusCode: 403,
          message: "'tenantId' is not provided as a header.",
        });
      }

      const tenant = await this.tenantsService.getOneById(tenantId as string);

      if (!tenant) {
        return res.send({
          statusCode: 404,
          message: `Tenant with id: '${tenantId}' not found.`,
        });
      }

      req.tenant = tenant;

      next();
    } catch (error: any) {
      return res.send({
        statusCode: 404,
        message: `Tenant with id: '${tenantId}' not found.`,
      });
    }
  }
}
