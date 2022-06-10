import { Tenant } from './entities/Tenant/tenant.entity';

declare global {
  namespace Express {
    interface Request {
      configuration: any;
    }
  }
}
