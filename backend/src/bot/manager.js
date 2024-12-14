import { Bot } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import { session } from 'grammy';
import { bookConversation } from './conversations/book.conversation.js';
import { AdminService } from '../services/admin.service.js';

const adminService = new AdminService();

class BotManager {
  constructor() {
    this.bots = new Map();
  }

  async createBot(tenant) {
    try {
      const bot = new Bot(tenant.botToken);
      
      // Add error handler
      bot.catch((err) => {
        console.error(`Error in bot ${tenant.telegramUsername}:`, err);
      });

      // Install session middleware
      bot.use(session({
        initial: () => ({})
      }));

      // Install the conversations plugin
      bot.use(conversations());

      // Register the booking conversation
      bot.use(createConversation(bookConversation, "bookConversation"));

      // Add basic commands
      bot.command('start', async (ctx) => {
        const isAdmin = await adminService.isAdmin(BigInt(ctx.from.id), tenant.id);
        const isSuperAdmin = await adminService.isSuperAdmin(BigInt(ctx.from.id), tenant.id);

        let message = `👋 Welcome to ${tenant.telegramUsername}!\n\n`;

        if (isSuperAdmin) {
          message += 'Superadmin Commands:\n' +
            '/services - Manage services\n' +
            '/admins - Manage admins\n' +
            '/settings - Bot settings\n\n';
        } else if (isAdmin) {
          message += 'Admin Commands:\n' +
            '/bookings - View all bookings\n' +
            '/stats - View statistics\n\n';
        }

        message += 'Client Commands:\n' +
          '/book - Book a new appointment\n' +
          '/my_bookings - View your bookings\n' +
          '/cancel - Cancel a booking';

        await ctx.reply(message);
      });

      // Add booking command
      bot.command('book', async (ctx) => {
        await ctx.conversation.enter('bookConversation');
      });

      // Add my bookings command
      bot.command('my_bookings', async (ctx) => {
        await ctx.reply(
          '📋 Your Bookings:\n\n' +
          'You don\'t have any active bookings.\n\n' +
          'Use /book to make a new appointment!'
        );
      });

      // Add cancel command
      bot.command('cancel', async (ctx) => {
        await ctx.reply(
          '❌ Cancel Booking\n\n' +
          'You don\'t have any active bookings to cancel.\n\n' +
          'Use /book to make a new appointment!'
        );
      });

      // Add admin commands
      bot.command('services', async (ctx) => {
        const isSuperAdmin = await adminService.isSuperAdmin(BigInt(ctx.from.id), tenant.id);
        if (!isSuperAdmin) {
          await ctx.reply('❌ This command is only available to superadmins.');
          return;
        }

        await ctx.reply(
          '⚙️ Service Management\n\n' +
          'Use these commands to manage services:\n\n' +
          '/add_service - Add a new service\n' +
          '/edit_service - Edit an existing service\n' +
          '/remove_service - Remove a service\n' +
          '/list_services - List all services'
        );
      });

      bot.command('admins', async (ctx) => {
        const isSuperAdmin = await adminService.isSuperAdmin(BigInt(ctx.from.id), tenant.id);
        if (!isSuperAdmin) {
          await ctx.reply('❌ This command is only available to superadmins.');
          return;
        }

        await ctx.reply(
          '👥 Admin Management\n\n' +
          'Use these commands to manage admins:\n\n' +
          '/add_admin - Add a new admin\n' +
          '/remove_admin - Remove an admin\n' +
          '/list_admins - List all admins'
        );
      });

      bot.command('settings', async (ctx) => {
        const isSuperAdmin = await adminService.isSuperAdmin(BigInt(ctx.from.id), tenant.id);
        if (!isSuperAdmin) {
          await ctx.reply('❌ This command is only available to superadmins.');
          return;
        }

        await ctx.reply(
          '⚙️ Bot Settings\n\n' +
          'Use these commands to customize your bot:\n\n' +
          '/set_colors - Set brand colors\n' +
          '/set_schedule - Set working hours\n' +
          '/set_holidays - Set holidays and days off'
        );
      });

      // Start the bot
      await bot.start();
      
      // Store the bot instance
      this.bots.set(tenant.id, bot);
      
      return bot;
    } catch (error) {
      console.error(`Failed to create bot for tenant ${tenant.id}:`, error);
      return null;
    }
  }

  async stopBot(tenantId) {
    const bot = this.bots.get(tenantId);
    if (bot) {
      await bot.stop();
      this.bots.delete(tenantId);
      return true;
    }
    return false;
  }

  getBot(tenantId) {
    return this.bots.get(tenantId);
  }

  async stopAllBots() {
    const promises = [];
    for (const [tenantId, bot] of this.bots.entries()) {
      promises.push(this.stopBot(tenantId));
    }
    await Promise.all(promises);
  }
}

export const botManager = new BotManager();
