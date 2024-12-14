export const startCommand = async (ctx) => {
  await ctx.reply(
    'Welcome to Barber Book Bot Manager! 🎉\n\n' +
    'I can help you set up and manage your own booking bot for your barbershop.\n\n' +
    'Available commands:\n' +
    '/setup_bot - Create a new booking bot\n' +
    '/my_bots - View your existing bots\n\n' +
    'To get started, create a new bot with @BotFather first, then use /setup_bot command.'
  );
};
