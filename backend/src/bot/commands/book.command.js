import { TenantService } from '../../services/tenant.service.js';

const tenantService = new TenantService();

export const bookCommand = async (ctx) => {
  const services = await tenantService.getTenantServices(ctx.tenant.id);

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
};
