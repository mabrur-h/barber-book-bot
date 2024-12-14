import { Bot } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import { session } from 'grammy';
import { config } from '../../config/index.js';
import { setupMainBotCommands } from './commands/index.js';
import { setupMainBotCallbacks } from './callbacks/index.js';
import { setupBotConversation } from './conversations/setup-bot.conversation.js';

class MainBot {
  constructor() {
    if (!process.env.MAIN_BOT_TOKEN) {
      throw new Error('MAIN_BOT_TOKEN is required');
    }
    
    this.bot = new Bot(process.env.MAIN_BOT_TOKEN);
    this.setup();
  }

  setup() {
    // Add error handler
    this.bot.catch((err) => {
      console.error('Error in bot:', err);
    });

    // Install session middleware
    this.bot.use(session({
      initial: () => ({})
    }));

    // Install the conversations plugin
    this.bot.use(conversations());

    // Register the setup bot conversation
    this.bot.use(createConversation(setupBotConversation, "setupBotConversation"));

    // Add commands
    setupMainBotCommands(this.bot);
    
    // Add callback handlers
    setupMainBotCallbacks(this.bot);
  }

  async start() {
    try {
      // Start receiving updates
      await this.bot.start();
      console.log('Main bot started successfully');
    } catch (error) {
      console.error('Failed to start main bot:', error);
      throw error;
    }
  }

  async stop() {
    await this.bot.stop();
  }
}

export const mainBot = new MainBot();
