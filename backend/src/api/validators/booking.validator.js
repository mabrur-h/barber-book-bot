import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    tenantId: z.string().uuid(),
    userId: z.string().uuid(),
    serviceId: z.string().uuid(),
    bookingTime: z.string().datetime(),
  }),
});

export const updateBookingStatusSchema = z.object({
  params: z.object({
    bookingId: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
  }),
});
