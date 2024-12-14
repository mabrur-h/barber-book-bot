import { z } from 'zod';

export const createTenantSchema = z.object({
  body: z.object({
    telegramUsername: z.string()
      .min(5)
      .regex(/^[A-Za-z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    botToken: z.string()
      .min(45)
      .regex(/^\d+:[A-Za-z0-9_-]{35}$/, 'Invalid bot token format'),
    brandSettings: z.object({
      primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
      secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
      logo: z.string().url().optional(),
    }),
  }),
});
