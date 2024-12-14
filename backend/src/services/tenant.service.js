import { prisma } from '../lib/prisma.js';

export class TenantService {
  async createTenant(data) {
    return await prisma.tenant.create({
      data: {
        telegramUsername: data.telegramUsername,
        botToken: data.botToken,
        brandSettings: data.brandSettings,
        ownerId: data.ownerId,
        status: 'PENDING'
      }
    });
  }

  async getTenantsByOwner(ownerId) {
    return await prisma.tenant.findMany({
      where: {
        ownerId: BigInt(ownerId),
      }
    });
  }

  async getTenantById(id) {
    return await prisma.tenant.findUnique({
      where: { id }
    });
  }

  async updateTenantStatus(id, status) {
    return await prisma.tenant.update({
      where: { id },
      data: { status }
    });
  }

  async deleteTenant(id) {
    return await prisma.tenant.delete({
      where: { id }
    });
  }

  async updateTenantBrandSettings(id, brandSettings) {
    return await prisma.tenant.update({
      where: { id },
      data: {
        brandSettings
      }
    });
  }
}
