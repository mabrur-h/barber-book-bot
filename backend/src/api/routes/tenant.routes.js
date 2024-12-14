import { Router } from 'express';
import { TenantController } from '../controllers/tenant.controller.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { createTenantSchema } from '../validators/tenant.validator.js';

const router = Router();
const tenantController = new TenantController();

router.post(
  '/',
  validateRequest(createTenantSchema),
  tenantController.createTenant
);

router.get(
  '/:tenantId/services',
  tenantController.getTenantServices
);

router.post(
  '/:tenantId/services',
  tenantController.createService
);

export { router as tenantRoutes };
