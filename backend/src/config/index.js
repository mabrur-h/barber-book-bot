import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  telegram: {
    webhookDomain: process.env.TELEGRAM_WEBHOOK_DOMAIN,
    webhookPath: '/webhook',
  },
} 
