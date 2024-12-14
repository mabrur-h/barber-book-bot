import { startCommand } from './start.command.js';
import { bookCommand } from './book.command.js';
import { myBookingsCommand } from './my-bookings.command.js';

export const setupCommands = (bot) => {
  bot.command('start', startCommand);
  bot.command('book', bookCommand);
  bot.command('my_bookings', myBookingsCommand);
};
