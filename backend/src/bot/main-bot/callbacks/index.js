import { manageBotCallback } from './manage-bot.callback.js';

export const setupMainBotCallbacks = (bot) => {
  // Handle manage_bot callback
  bot.callbackQuery(/^manage_bot:(.+)$/, manageBotCallback);
};
