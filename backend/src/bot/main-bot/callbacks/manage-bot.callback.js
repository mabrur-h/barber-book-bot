import { TenantService } from '../../../services/tenant.service.js';

const tenantService = new TenantService();

export const manageBotCallback = async (ctx) => {
  const tenantId = ctx.match[1];
  const tenant = await tenantService.getTenantById(tenantId);

  if (!tenant) {
    await ctx.answerCallbackQuery('Bot not found');
    return;
  }

  // Check if the user is the owner
  if (tenant.ownerId !== BigInt(ctx.from.id)) {
    await ctx.answerCallbackQuery('You are not authorized to manage this bot');
    return;
  }

  const statusEmoji = tenant.status === 'ACTIVE' ? '🟢' : '🔴';
  const buttons = [
    [
      {
        text: tenant.status === 'ACTIVE' ? '🔴 Deactivate' : '🟢 Activate',
        callback_data: `toggle_bot:${tenant.id}`,
      },
    ],
    [
      {
        text: '🎨 Customize Appearance',
        callback_data: `customize_bot:${tenant.id}`,
      },
    ],
    [
      {
        text: '📊 View Statistics',
        callback_data: `stats_bot:${tenant.id}`,
      },
    ],
  ];

  await ctx.editMessageText(
    `Managing @${tenant.telegramUsername}\n\n` +
    `Status: ${statusEmoji} ${tenant.status}\n` +
    `Created: ${tenant.createdAt.toLocaleDateString()}\n\n` +
    'Select an action:',
    {
      reply_markup: {
        inline_keyboard: buttons,
      },
    }
  );

  await ctx.answerCallbackQuery();
};
