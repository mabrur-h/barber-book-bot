import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { createBookingSchema, updateBookingStatusSchema } from '../validators/booking.validator.js';

const router = Router();
const bookingController = new BookingController();

router.post(
  '/',
  validateRequest(createBookingSchema),
  bookingController.createBooking
);

router.get(
  '/tenant/:tenantId',
  bookingController.getTenantBookings
);

router.get(
  '/user/:userId',
  bookingController.getUserBookings
);

router.patch(
  '/:bookingId/status',
  validateRequest(updateBookingStatusSchema),
  bookingController.updateBookingStatus
);

export { router as bookingRoutes };
