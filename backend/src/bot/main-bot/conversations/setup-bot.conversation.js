import { Bot } from 'grammy';
import { TenantService } from '../../../services/tenant.service.js';
import { AdminService } from '../../../services/admin.service.js';
import { botManager } from '../../manager.js';

const tenantService = new TenantService();
const adminService = new AdminService();

export async function setupBotConversation(conversation, ctx) {
  try {
    // Get bot token
    await ctx.reply(
      '🤖 Let\'s set up your booking bot!\n\n' +
      '1. First, create a new bot with @BotFather\n' +
      '2. Get the bot token from BotFather\n' +
      '3. Send me your bot token\n\n' +
      'Please send me your bot token:'
    );

    const tokenMsg = await conversation.waitFor(':text');
    const botToken = tokenMsg.message.text;

    // Validate bot token format
    if (!/^\d+:[A-Za-z0-9_-]{35}$/.test(botToken)) {
      await ctx.reply(
        '❌ Invalid bot token format. Please send a valid bot token.\n' +
        'You can get it from @BotFather when creating a new bot.'
      );
      return;
    }

    // Try to get bot info using the token
    try {
      const tempBot = new Bot(botToken);
      const botInfo = await tempBot.api.getMe();
      
      // Create tenant record
      const tenant = await tenantService.createTenant({
        telegramUsername: botInfo.username,
        botToken,
        brandSettings: {
          primaryColor: '#000000',
          secondaryColor: '#ffffff',
        },
        ownerId: BigInt(ctx.from.id),
      });

      // Create superadmin record
      await adminService.createAdmin({
        telegramId: BigInt(ctx.from.id),
        role: 'SUPERADMIN',
        tenantId: tenant.id
      });

      // Initialize the bot
      const bot = await botManager.createBot(tenant);
      if (!bot) {
        await tenantService.deleteTenant(tenant.id);
        await ctx.reply('❌ Failed to initialize your bot. Please try again later.');
        return;
      }

      // Activate tenant
      await tenantService.updateTenantStatus(tenant.id, 'ACTIVE');

      await ctx.reply(
        '✅ Your booking bot has been successfully set up!\n\n' +
        `Bot username: @${botInfo.username}\n\n` +
        'As a superadmin, you can:\n' +
        '1. Add/edit services using /services command\n' +
        '2. Manage admins using /admins command\n' +
        '3. Customize bot settings using /settings command\n\n' +
        'Share your bot\'s username with your clients to start receiving bookings!\n\n' +
        'You can manage all your bots using /my_bots command in this chat.'
      );

    } catch (error) {
      console.error('Error setting up bot:', error);
      await ctx.reply(
        '❌ Failed to set up your bot. Please make sure:\n' +
        '1. The token is correct\n' +
        '2. The bot is not being used by another system\n' +
        '3. Try creating a new bot with @BotFather'
      );
    }
  } catch (error) {
    console.error('Error in setup bot conversation:', error);
    await ctx.reply('❌ Something went wrong. Please try again later.');
  }
}
