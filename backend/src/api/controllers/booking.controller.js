import { BookingService } from '../../services/booking.service.js';

export class BookingController {
  constructor() {
    this.bookingService = new BookingService();
  }

  createBooking = async (req, res, next) => {
    try {
      const { tenantId, userId, serviceId, bookingTime } = req.body;
      
      const booking = await this.bookingService.createBooking({
        tenantId,
        userId,
        serviceId,
        bookingTime,
      });

      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  };

  getTenantBookings = async (req, res, next) => {
    try {
      const { tenantId } = req.params;
      const { status } = req.query;

      const bookings = await this.bookingService.getTenantBookings(tenantId, status);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };

  getUserBookings = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { status } = req.query;

      const bookings = await this.bookingService.getUserBookings(userId, status);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };

  updateBookingStatus = async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;

      const booking = await this.bookingService.updateBookingStatus(bookingId, status);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  };
}
