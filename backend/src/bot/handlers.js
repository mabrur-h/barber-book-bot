import { Router } from '@grammyjs/router';
import { prisma } from '../db.js';

export function setupBotHandlers(bot) {
  const router = new Router((ctx) => ctx.session?.step);

  // Start command
  bot.command('start', async (ctx) => {
    const telegramId = ctx.from.id;
    const tenant = ctx.tenant;

    // Check if user exists
    let user = await prisma.user.findFirst({
      where: {
        tenantId: tenant.id,
        telegramId: BigInt(telegramId),
      },
    });

    // Create user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          tenantId: tenant.id,
          telegramId: BigInt(telegramId),
          name: ctx.from.first_name,
        },
      });
    }

    await ctx.reply(
      `Welcome to ${tenant.telegramUsername}'s booking bot! 🎉\n` +
      'Use /book to make a new appointment or /my_bookings to view your existing ones.'
    );
  });

  // Book command
  bot.command('book', async (ctx) => {
    const services = await prisma.service.findMany({
      where: { tenantId: ctx.tenant.id },
    });

    if (services.length === 0) {
      await ctx.reply('Sorry, no services are available at the moment.');
      return;
    }

    const serviceButtons = services.map(service => ({
      text: `${service.name} (${service.duration}min - $${(service.price / 100).toFixed(2)})`,
      callback_data: `service:${service.id}`,
    }));

    await ctx.reply('Please select a service:', {
      reply_markup: {
        inline_keyboard: serviceButtons.map(button => [button]),
      },
    });
  });

  // My bookings command
  bot.command('my_bookings', async (ctx) => {
    const bookings = await prisma.booking.findMany({
      where: {
        tenant: { id: ctx.tenant.id },
        user: { telegramId: BigInt(ctx.from.id) },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      include: {
        service: true,
      },
      orderBy: {
        bookingTime: 'asc',
      },
    });

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
  });

  // Add router middleware
  bot.use(router);
}
