import { TenantService } from '../../services/tenant.service.js';
import { botManager } from '../../bot/manager.js';

export class TenantController {
  constructor() {
    this.tenantService = new TenantService();
  }

  createTenant = async (req, res, next) => {
    try {
      const { telegramUsername, botToken, brandSettings } = req.body;

      const tenant = await this.tenantService.createTenant({
        telegramUsername,
        botToken,
        brandSettings,
      });

      // Initialize bot for the new tenant
      const bot = await botManager.createBot(tenant);
      if (!bot) {
        await this.tenantService.deleteTenant(tenant.id);
        throw new Error('Failed to initialize bot');
      }

      // Activate tenant
      const activatedTenant = await this.tenantService.updateTenantStatus(
        tenant.id,
        'ACTIVE'
      );

      res.status(201).json(activatedTenant);
    } catch (error) {
      next(error);
    }
  };

  getTenantServices = async (req, res, next) => {
    try {
      const { tenantId } = req.params;
      const services = await this.tenantService.getTenantServices(tenantId);
      res.json(services);
    } catch (error) {
      next(error);
    }
  };

  createService = async (req, res, next) => {
    try {
      const { tenantId } = req.params;
      const { name, duration, price } = req.body;
      
      const service = await this.tenantService.createService({
        tenantId,
        name,
        duration,
        price,
      });
      
      res.status(201).json(service);
    } catch (error) {
      next(error);
    }
  };
}
