import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { botManager } from './bot/manager.js';
import { mainBot } from './bot/main-bot/index.js';
import { prisma } from './lib/prisma.js';
import { tenantRoutes } from './api/routes/tenant.routes.js';
import { bookingRoutes } from './api/routes/booking.routes.js';
import { errorHandler } from './api/middlewares/error.middleware.js';

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Routes
app.use('/api/tenants', tenantRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling
app.use(errorHandler);

// Initialize all active bots on startup
async function initializeBots() {
  const activeTenants = await prisma.tenant.findMany({
    where: { status: 'ACTIVE' },
  });

  for (const tenant of activeTenants) {
    await botManager.createBot(tenant);
  }
}

// Initialize bots and start server
async function startServer() {
  try {
    // Start main bot
    await mainBot.start();
    
    // Initialize tenant bots
    await initializeBots();
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
