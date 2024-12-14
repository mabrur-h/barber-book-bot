import { prisma } from '../lib/prisma.js';

export class AdminService {
  async createAdmin(data) {
    return await prisma.admin.create({
      data: {
        telegramId: data.telegramId,
        role: data.role || 'ADMIN',
        tenantId: data.tenantId
      }
    });
  }

  async getAdminsByTenant(tenantId) {
    return await prisma.admin.findMany({
      where: {
        tenantId
      }
    });
  }

  async getAdmin(telegramId, tenantId) {
    return await prisma.admin.findFirst({
      where: {
        telegramId,
        tenantId
      }
    });
  }

  async isSuperAdmin(telegramId, tenantId) {
    const admin = await this.getAdmin(telegramId, tenantId);
    return admin?.role === 'SUPERADMIN';
  }

  async isAdmin(telegramId, tenantId) {
    const admin = await this.getAdmin(telegramId, tenantId);
    return admin != null;
  }

  async updateAdminRole(telegramId, tenantId, role) {
    return await prisma.admin.update({
      where: {
        telegramId_tenantId: {
          telegramId,
          tenantId
        }
      },
      data: {
        role
      }
    });
  }

  async removeAdmin(telegramId, tenantId) {
    return await prisma.admin.delete({
      where: {
        telegramId_tenantId: {
          telegramId,
          tenantId
        }
      }
    });
  }
}
