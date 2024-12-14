import { TenantService } from '../../../services/tenant.service.js';
import { botManager } from '../../manager.js';

const tenantService = new TenantService();

export const setupBotCommand = async (ctx) => {
  // Start the setup conversation
  await ctx.conversation.enter('setupBotConversation');
};
