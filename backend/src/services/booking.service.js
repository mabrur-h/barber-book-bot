import { prisma } from '../lib/prisma.js';

export class BookingService {
  async createBooking(data) {
    return prisma.booking.create({
      data: {
        tenantId: data.tenantId,
        userId: data.userId,
        serviceId: data.serviceId,
        bookingTime: new Date(data.bookingTime),
      },
      include: {
        service: true,
        user: true,
      },
    });
  }

  async getTenantBookings(tenantId, status) {
    return prisma.booking.findMany({
      where: {
        tenantId,
        ...(status ? { status } : {}),
      },
      include: {
        service: true,
        user: true,
      },
      orderBy: {
        bookingTime: 'asc',
      },
    });
  }

  async getUserBookings(userId, status) {
    return prisma.booking.findMany({
      where: {
        userId,
        ...(status ? { status } : {}),
      },
      include: {
        service: true,
        tenant: true,
      },
      orderBy: {
        bookingTime: 'asc',
      },
    });
  }

  async updateBookingStatus(bookingId, status) {
    return prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        service: true,
        user: true,
      },
    });
  }

  async getBookingById(bookingId) {
    return prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        user: true,
        tenant: true,
      },
    });
  }
}
