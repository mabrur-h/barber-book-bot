import { setupBotCommand } from './setup-bot.command.js';
import { myBotsCommand } from './my-bots.command.js';

export function setupMainBotCommands(bot) {
  bot.command('start', async (ctx) => {
    await ctx.reply(
      '👋 Welcome to Barber Book Bot!\n\n' +
      'I can help you create and manage your own booking bot for your barbershop.\n\n' +
      'Available commands:\n' +
      '/setup_bot - Create a new booking bot\n' +
      '/my_bots - Manage your existing bots'
    );
  });

  bot.command('setup_bot', setupBotCommand);
  bot.command('my_bots', myBotsCommand);
}
