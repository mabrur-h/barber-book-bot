import { prisma } from '../lib/prisma.js';

export class UserService {
  async findOrCreateUser(data) {
    const existingUser = await prisma.user.findFirst({
      where: {
        tenantId: data.tenantId,
        telegramId: data.telegramId,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    return prisma.user.create({
      data: {
        tenantId: data.tenantId,
        telegramId: data.telegramId,
        name: data.name,
      },
    });
  }

  async getUserBookings(userId) {
    return prisma.booking.findMany({
      where: {
        userId,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        bookingTime: 'asc',
      },
    });
  }
}
