export async function bookConversation(conversation, ctx) {
  try {
    // Ask for service selection
    await ctx.reply(
      '📅 Let\'s book an appointment!\n\n' +
      'Please select a service:\n\n' +
      '1. Haircut - 30 min\n' +
      '2. Beard Trim - 15 min\n' +
      '3. Full Service - 45 min\n\n' +
      'Type the number of the service you want to book.'
    );

    // Wait for service selection
    const serviceMsg = await conversation.waitFor(':text');
    const serviceNumber = parseInt(serviceMsg.message.text);

    if (isNaN(serviceNumber) || serviceNumber < 1 || serviceNumber > 3) {
      await ctx.reply(
        '❌ Invalid selection. Please use /book to start over.'
      );
      return;
    }

    const services = [
      { id: 1, name: 'Haircut', duration: 30 },
      { id: 2, name: 'Beard Trim', duration: 15 },
      { id: 3, name: 'Full Service', duration: 45 }
    ];

    const selectedService = services[serviceNumber - 1];

    // Ask for date
    await ctx.reply(
      `📅 You selected: ${selectedService.name} (${selectedService.duration} min)\n\n` +
      'Please enter the date for your appointment (DD/MM/YYYY):'
    );

    // Wait for date
    const dateMsg = await conversation.waitFor(':text');
    const dateStr = dateMsg.message.text;

    // Simple date validation
    const date = new Date(dateStr.split('/').reverse().join('-'));
    if (isNaN(date.getTime()) || date < new Date()) {
      await ctx.reply(
        '❌ Invalid date. Please use /book to start over.'
      );
      return;
    }

    // Ask for time
    await ctx.reply(
      '🕒 Please enter the time for your appointment (HH:MM):'
    );

    // Wait for time
    const timeMsg = await conversation.waitFor(':text');
    const timeStr = timeMsg.message.text;

    // Simple time validation
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      await ctx.reply(
        '❌ Invalid time. Please use /book to start over.'
      );
      return;
    }

    // Confirm booking
    await ctx.reply(
      '✅ Booking Confirmed!\n\n' +
      `Service: ${selectedService.name}\n` +
      `Date: ${dateStr}\n` +
      `Time: ${timeStr}\n` +
      `Duration: ${selectedService.duration} minutes\n\n` +
      'Use /my_bookings to view your appointments\n' +
      'Use /cancel to cancel this booking'
    );

  } catch (error) {
    console.error('Error in book conversation:', error);
    await ctx.reply('❌ Something went wrong. Please try again later.');
  }
}
