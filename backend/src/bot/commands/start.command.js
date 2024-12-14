import { UserService } from '../../services/user.service.js';

const userService = new UserService();

export const startCommand = async (ctx) => {
  const telegramId = ctx.from.id;
  const tenant = ctx.tenant;

  // Check if user exists
  let user = await userService.findOrCreateUser({
    tenantId: tenant.id,
    telegramId: BigInt(telegramId),
    name: ctx.from.first_name,
  });

  await ctx.reply(
    `Welcome to ${tenant.telegramUsername}'s booking bot! 🎉\n` +
    'Use /book to make a new appointment or /my_bookings to view your existing ones.'
  );
};
