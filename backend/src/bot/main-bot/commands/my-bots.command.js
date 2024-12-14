import { TenantService } from '../../../services/tenant.service.js';

const tenantService = new TenantService();

export const myBotsCommand = async (ctx) => {
  const tenants = await tenantService.getTenantsByOwner(ctx.from.id);

  if (!tenants || tenants.length === 0) {
    await ctx.reply(
      '❌ You don\'t have any bots yet.\n\n' +
      'Use /setup_bot to create your first booking bot!'
    );
    return;
  }

  const message = tenants.map((tenant, index) => {
    const statusEmoji = tenant.status === 'ACTIVE' ? '🟢' : '🔄';
    return `${index + 1}. ${statusEmoji} @${tenant.telegramUsername}`;
  }).join('\n');

  await ctx.reply(
    '🤖 Your Bots:\n\n' +
    message + '\n\n' +
    'Use /setup_bot to create a new bot'
  );
};
