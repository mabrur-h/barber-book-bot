import { UserService } from '../../services/user.service.js';

const userService = new UserService();

export const myBookingsCommand = async (ctx) => {
  const bookings = await userService.getUserBookings(ctx.from.id);

  if (bookings.length === 0) {
    await ctx.reply('You have no upcoming bookings.');
    return;
  }

  const bookingsList = bookings
    .map(booking => {
      const date = booking.bookingTime.toLocaleDateString();
      const time = booking.bookingTime.toLocaleTimeString();
      return `🗓 ${date} ${time}\n` +
             `Service: ${booking.service.name}\n` +
             `Status: ${booking.status}\n`;
    })
    .join('\n');

  await ctx.reply('Your upcoming bookings:\n\n' + bookingsList);
};
